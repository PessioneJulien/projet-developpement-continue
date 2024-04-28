# Développemennt continue

Description de votre projet ici. Incluez toutes les informations pertinentes sur le but du projet et ses composants.

## Pour Commencer

Ces instructions couvriront les informations d'utilisation et la configuration des conteneurs Docker de votre projet.

### Prérequis

- Docker
- Docker Compose

Assurez-vous que Docker et Docker Compose sont installés sur votre système. Pour les instructions d'installation, référez-vous à  https://docs.docker.com/get-docker/

### Installation

Une série d'exemples étape par étape qui vous expliquent comment obtenir un environnement de développement en fonctionnement.

#### Configuration de l'Application FastAPI

Dans la racine exécutez la commande suivante pour construire et démarrer votre application FastAPI en mode détaché :

```bash
docker-compose -f ./docker-compose-fastapi.yml up -d --build
```

Cette commande démarrera tous les services définis dans votre configuration Docker Compose FastAPI. Pour arrêter et supprimer les conteneurs, utilisez la commande suivante :

```bash
docker-compose -f ./docker-compose-fastapi.yml down
```
Configuration de l'Application Node.js

Dans la racine exécutez la commande suivante pour construire et démarrer votre application Node.js en mode détaché :

```bash
docker-compose -f ./docker-compose-node.yml up -d --build
```

Cette commande démarrera tous les services définis dans votre configuration Docker Compose Node.js. Pour arrêter et supprimer les conteneurs, utilisez la commande suivante :

```bash
docker-compose -f ./docker-compose-node.yml down
```

Utilisation

Après le démarrage des conteneurs, vos applications seront accessibles à :

    FastAPI : http://localhost:8000    
    Node.js : http://localhost:8000