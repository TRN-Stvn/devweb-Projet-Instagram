# Utiliser une image Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier le package.json et package-lock.json (le cas échéant)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application fonctionne
EXPOSE 8080

# Commande pour exécuter l'application
CMD ["node", "app.js"]
