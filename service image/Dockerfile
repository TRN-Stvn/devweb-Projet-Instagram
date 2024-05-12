# Utiliser une image de base officielle Python
FROM python:3.12.3-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances et installer les dépendances
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel Flask s'exécute
EXPOSE 5000

# Définir la variable d'environnement pour l'exécution Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Commande pour démarrer l'application lors du lancement du conteneur
CMD ["flask", "run"]
