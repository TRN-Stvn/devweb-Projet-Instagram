const express = require('express');
const passport = require('passport');
const path = require('path'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const usersFilePath = 'users.json';

// Configuration de la session
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialisation de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configuration de la stratégie Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8081/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Ce callback est appelé lorsque l'authentification réussit
    // Récupère les informations de l'utilisateur depuis le profil
    const userEmail = profile.emails[0].value;
    const userFirstName = profile.name.givenName;
    const userId = generateUserId(userEmail, userFirstName); // Function to generate or retrieve a unique user ID
    return done(null, { id: userId, email: userEmail, firstName: userFirstName });
}));

// Sérialisation de l'utilisateur dans la session
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    if (user && user.id) {
        done(null, user.id);
    } else {
        done(new Error('User ID not available for serialization'));
    }
});

// Désérialisation de l'utilisateur depuis la session
passport.deserializeUser((id, done) => {
    // Retrieve user based on the serialized user ID
    const user = usersData.find(u => u.id === id);
    done(null, user);
});

// Charge les données des utilisateurs depuis le fichier JSON
function loadUsersData() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.users || []; // Ensure it returns an array even if users key doesn't exist
    } catch (err) {
        console.error('Error loading user data:', err);
        return [];
    }
}

// Enregistre les données des utilisateurs dans le fichier JSON
function saveUsersData(data) {
    try {
        const jsonData = JSON.stringify({ users: data }, null, 2); // Wrap data in an object with a 'users' key
        fs.writeFileSync(usersFilePath, jsonData);
        console.log('User data saved successfully.');
    } catch (err) {
        console.error('Error saving user data:', err);
    }
}

// Charge les données des utilisateurs au démarrage de l'application
let usersData = loadUsersData();
console.log('usersData:', usersData); // Add this line to log the value of usersData

// Route d'authentification avec Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Initialise le compteur pour les identifiants des utilisateurs au dernier ID existant dans le fichier JSON
let userIdCounter = usersData.length > 0 ? usersData[usersData.length - 1].id + 1 : 0;

// Callback de redirection après l'authentification avec Google
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Récupère les informations de l'utilisateur depuis la session
        const userEmail = req.user.email;
        const userFirstName = req.user.firstName;

        // Vérifie si l'utilisateur existe déjà dans la base de données
        const existingUser = usersData.find(user => user.email === userEmail);
        if (!existingUser) {
            // Si l'utilisateur n'existe pas, attribue un nouvel ID séquentiel à l'utilisateur
            const userId = userIdCounter++;

            // Ajoute le nouvel utilisateur dans les données avec son ID
            usersData.push({ id: userId, email: userEmail, firstName: userFirstName });

            // Enregistre les nouvelles données des utilisateurs
            saveUsersData(usersData);
        }

        // Redirection après une authentification réussie
        console.log('User ID:', req.user.id); // Add this line to log the user ID
        res.redirect(`http://localhost:4200/?userId=${req.user.id}&userName=${req.user.firstName}`); // Redirect to Angular interface with userId as a query parameter
    }
);


// Route pour afficher les informations de l'utilisateur
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Bienvenue, ' + req.user.firstName);
    } else {
        res.redirect('/');
    }
});

// Route pour se déconnecter
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:8081');
});

// Route pour fournir les données JSON des utilisateurs (affiche uniquement l'ID et le prénom)
app.get('/users', (req, res) => {
    const simplifiedUserData = usersData.map(user => ({ id: user.id, firstName: user.firstName }));
    res.json(simplifiedUserData);
});

// Route pour fournir les données JSON d'un utilisateur par son index dans le tableau (affiche uniquement l'ID et le prénom)
app.get('/users/:index', (req, res) => {
    const userIndex = parseInt(req.params.index);
    if (userIndex >= 0 && userIndex < usersData.length) {
        const userData = usersData[userIndex];
        const simplifiedUserData = { id: userData.id, firstName: userData.firstName };
        res.json(simplifiedUserData);
    } else {
        res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
});

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'accueil.html'));
});

// Démarrage du serveur sur le port 8081
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});

function generateUserId(email,firstName) {
    let user = usersData.find(u => u.email === email);
    if (!user) {
        const newUserId = usersData.length > 0 ? usersData[usersData.length - 1].id + 1 : 0;
        user = { id: newUserId, email: email, firstName: firstName };
        usersData.push(user);
        saveUsersData(usersData);
    }
    return user.id;
}

