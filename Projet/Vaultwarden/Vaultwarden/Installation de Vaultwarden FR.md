# Installation de Vaultwarden

## Installation de docker 


### Configurer le dépôt de Docker

*Source : https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Procedure/Docker/Installation%20Docker.md?plain=1*

1. Mettez à jour la liste des paquets :

    ```
    sudo apt-get update
    ```

2. Installez les paquets nécessaires :

    ```
    sudo apt-get install ca-certificates curl gnupg
    ```

3. Créez le répertoire pour les clés de dépôt :

    ```
    sudo install -m 0755 -d /etc/apt/keyrings
    ```

4. Téléchargez et ajoutez la clé GPG de Docker :

    ```
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```

5. Changez les permissions de la clé GPG :

    ```
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    ```

6. Ajoutez le dépôt Docker à la liste des sources APT :

    ```
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

7. Mettez à jour la liste des paquets pour inclure le dépôt Docker :

    ```
    sudo apt-get update
    ```

8. Installez les paquets Docker nécessaires :

    ```
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

### Vérifiez le bon fonctionnement de Docker

9. Vérifiez l'état du service Docker :

    ```
    systemctl status docker
    ```

10. Si Docker est bien en "active (running)", activez le service Docker pour qu'il démarre automatiquement après le redémarrage de la machine :

    ```
    sudo systemctl enable docker
    ```
### QUELQUES COMMANDES UTILES POUR DOCKER

- `docker ps -a` : Permet de voir les conteneurs fonctionnels, la date de création, l'âge du conteneur, son nom et son ID.
- `docker stop <container_id>` / `docker rm <container_id>` : Permet d'arrêter (`stop`) et de supprimer (`rm`) un conteneur en ajoutant son ID.
- `docker compose up -d` : Lance le fichier `docker-compose.yml` pour exécuter les conteneurs en mode détaché (`-d`).

#### Détails des commandes

##### `docker ps -a`
Affiche tous les conteneurs, qu'ils soient en cours d'exécution ou arrêtés, avec des informations telles que :
- ID du conteneur
- Image utilisée
- Commande exécutée
- Date de création
- État (en cours d'exécution, arrêté, etc.)
- Ports exposés
- Noms des conteneurs

##### `docker stop <container_id>` / `docker rm <container_id>`
- `docker stop <container_id>` : Arrête un conteneur en cours d'exécution.
- `docker rm <container_id>` : Supprime un conteneur arrêté.

**Exemple :**
```sh
docker stop 1a2b3c4d5e6f
docker rm 1a2b3c4d5e6f
```

## Création des certifications autosignés avec OpenSSL

*Pour cette partie nous utiliserons des certificats auto-signés, en production nous reproduirons cette étape en copiant les certificats.*

1. Une fois Docker installé, on va avoir besoin de certificats pour la connexion à l'interface web de VaultWarden. Pour cela, on crée le répertoire /ssl et le répertoire /docker à la racine de notre machine Debian si ils n'existent pas déjà:

```sh
mkdir /ssl
mkdir /docker
```

*/ssl va nous servir à recueillir les fichiers .csr .crt et .key que nous allons créer et /docker les fichiers de configuration de nos containers*

2. On continu en générant les certificats autosignés. Déplacez-vous dans le répertoire /ssl:

```sh
cd /ssl
```

3. On crée ensuite 4 fichiers: .pem, .key, .crt et .csr:

```sh
openssl genrsa -des3 -out vaultwarden.key 2048
openssl req -x509 -new -nodes -key vaultwarden.key -sha256 -days 10000 -out vaultwarden.pem
openssl genrsa -out vaultwarden.key 2048
openssl req -new -key vaultwarden.key -out vaultwarden.csr
openssl x509 -req -days 10000 -in vaultwarden.csr -signkey vaultwarden.key -out vaultwarden.crt
```

*NB: le certificat généré et valide 10000 jours (environ 27 ans) cette variable est ajustable au besoin. Si nécessaire un nouveau certificat peut-être réédité sur la machine grâce à la CA créer au dessus.*

## Création des fichiers des configurations Docker-compose.yml et CaddyFile pour le déploiement des containers. 

### A.	CRÉATION DU FICHIER CADDYFILE

1. On accède au répertoire /docker et on crée les fichiers nécessaires au déploiement des containers Caddy et Vaultwarden via Docker. On commence par le fichier Caddyfile:

```sh
nano Caddyfile
```

2. Copiez-y le contenu suivant:

*La première ligne correspond à l’intitulé de notre page vaultwarden qui sera atteignable via navigateur web.*

```sh  
*votre nom de domaine* {
  tls internal

  encode gzip

  reverse_proxy /notifications/hub vaultwarden:3012
  reverse_proxy vaultwarden:80
}
```
*Pour sauvegarder simplement Ctrl+ X et O*

3. Le fichier CaddyFile est créé, on passe au fichier docker-compose.yml:

### B.	CRÉATION DU FICHIER DOCKER-COMPOSE.YML

```sh
nano docker-compose.yml
```

On copie le contenu suivant:

```sh
version: '3.7'

services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: always
    environment:
      WEBSOCKET_ENABLED: true
      ADMIN_TOKEN: #YourAdminToken
      DOMAIN: "YourDomain" # Your domain; vaultwarden needs to know it's https to work properly with attachments
    volumes:
      - vw-data:/data

  caddy:
    image: caddy:2
    container_name: caddy
    restart: always
    ports:
      # Needed for the ACME HTTP-01 challenge.
      - 443:443
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - ./ssl:/ssl
      - caddy-config:/config
      - caddy-data:/data
      - caddy-logs:/logs
    environment:
      - DOMAIN= # Your domain.
      #EMAIL: "YOUR EMAIL"                 # The email address to use for ACME registration.
      #LOG_FILE: "/data/access.log"

volumes:
  vw-data:
  caddy-config:
  caddy-data:
  caddy-logs:
```

### C.	ACTIVER LA CONSOLE D’ADMINSTRATION

Ce sont ces lignes qui activent la console d’administration : 
```sh

      WEBSOCKET_ENABLED: true
      ADMIN_TOKEN: YourAdminToken
```

**Elles peuvent ne pas être ajouter, ou modifier pour masquer le Token (mots de passe) de la console admin.**


4. Pour masquer le token on ajoute ces lignes : 

```sh
WEBSOCKET_ENABLED: true
      # Reference the secret
      ADMIN_TOKEN_FILE: "/run/secrets/admin_token"

secrets:
  admin_token:
    file: ./admin_token.txt
```

5. On crée ensuite le fichier /run/secret et on crée le document admin_token.txt
Dans ce fichier on entre 

```sh
 echo "*NotreTokenDadministrationVaultWarden*" > admin_token.txt
```

### Mise en route des containers Docker

1. Pour lancer nos containers, on execute la commande suivante :

```sh
docker compose up -d
```

Pour vérifier le bon fonctionnement des containers, on peux saisir la commande : 
```sh
docker ps -a  
```

On va ensuite sur un navigateur et on entre notre nom de domaine de Vault Warden ici : http://YourDomain

Pour accéder à la console d’administrateur, il suffit de taper http://YourDomain/admin 

Bien que la connexion soit établie en HTTP, elle sera automatiquement redirigée en HTTPS en acceptant les risques liés aux certificats auto-signés.

**Vaultwarden à besoin d'être executer en HTTPS pour la création de compte**

VaultWarden est désormais opérationnel.
 
2. QUELQUES COMMANDE UTILE POUR DOCKER

```SH
•	docker ps -a : #Permet de voir les containers fonctionnel, la date de creation, l’age du container, son noms, et son ID
•	docker stop /rm *container id*: #permet d’arréter (stop) et supprimer (rm) un container en ajoutant son id. 
•	docker compose up -d : #lance le docker*compose.yml pour executer les containers. 
```
