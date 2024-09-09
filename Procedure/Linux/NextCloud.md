Nextcloud


## Prérequis

- **Serveur** : Serveur physique ou virtuel avec :
  - **CPU** : 2 cœurs minimum
  - **RAM** : 4 Go minimum
  - **Stockage** : Prévoir suffisamment d'espace pour vos données (1 To ou plus recommandé).
- **Système d'exploitation** : Linux (Ubuntu 22.04, Debian 11, CentOS, etc.)
- **Accès administrateur** : Root ou utilisateur avec privilèges `sudo`.

# Installation de Docker

## Configurer le dépôt de Docker

1. Mettez à jour la liste des paquets :

    ```
    sudo apt-get update
    ```

2. Installez les paquets nécessaires :

    ```
    sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
    ```

3. Créez le répertoire pour les clés de dépôt :

    ```
    sudo install -m 0755 -d /etc/apt/keyrings
    ```

4. Téléchargez et ajoutez la clé GPG de Docker :

    ```
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
    ```

5. Changez les permissions de la clé GPG :

    ```
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    ```

6. Ajoutez le dépôt Docker à la liste des sources APT :

    ```
    sudo sh -c "echo 'deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable' > /etc/apt/sources.list.d/docker.list"
    ```

7. Mettez à jour la liste des paquets pour inclure le dépôt Docker :

    ```
    sudo apt-get update
    ```

8. Installez les paquets Docker nécessaires :

    ```
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

## Vérifiez le bon fonctionnement de Docker

9. Vérifiez l'état du service Docker :

    ```
    systemctl status docker
    ```

10. Si Docker est bien en "active (running)", activez le service Docker pour qu'il démarre automatiquement après le redémarrage de la machine :

    ```
    sudo systemctl enable docker
    ```
## QUELQUES COMMANDES UTILES POUR DOCKER

- `docker ps -a` : Permet de voir les conteneurs fonctionnels, la date de création, l'âge du conteneur, son nom et son ID.
- `docker stop <container_id>` / `docker rm <container_id>` : Permet d'arrêter (`stop`) et de supprimer (`rm`) un conteneur en ajoutant son ID.
- `docker compose up -d` : Lance le fichier `docker-compose.yml` pour exécuter les conteneurs en mode détaché (`-d`).

### Détails des commandes

#### `docker ps -a`
Affiche tous les conteneurs, qu'ils soient en cours d'exécution ou arrêtés, avec des informations telles que :
- ID du conteneur
- Image utilisée
- Commande exécutée
- Date de création
- État (en cours d'exécution, arrêté, etc.)
- Ports exposés
- Noms des conteneurs

#### `docker stop <container_id>` / `docker rm <container_id>`
- `docker stop <container_id>` : Arrête un conteneur en cours d'exécution.
- `docker rm <container_id>` : Supprime un conteneur arrêté.

**Exemple :**
```sh
docker stop 1a2b3c4d5e6f
docker rm 1a2b3c4d5e6f
```

## Étape 2 : Préparer l'Environnement Nextcloud avec Docker Compose

1. **Créer un Répertoire pour Nextcloud** :
    ```sh
    mkdir ~/nextcloud-docker
    cd ~/nextcloud-docker
    ```

2. **Créer un Fichier `docker-compose.yml`** :
    ```sh
    nano docker-compose.yml
    ```

    **Contenu du fichier `docker-compose.yml` :**

    ```yaml
    version: '3.1'

    services:
      db:
        image: mariadb
        container_name: nextcloud-db
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: exemple-mot-de-passe-root
          MYSQL_DATABASE: nextcloud
          MYSQL_USER: nextclouduser
          MYSQL_PASSWORD: exemple-mot-de-passe-user
        volumes:
          - db_data:/var/lib/mysql

      app:
        image: nextcloud
        container_name: nextcloud-app
        ports:
          - 8080:80
        links:
          - db
        volumes:
          - nextcloud_data:/var/www/html
        environment:
          - MYSQL_HOST=db
          - MYSQL_DATABASE=nextcloud
          - MYSQL_USER=nextclouduser
          - MYSQL_PASSWORD=exemple-mot-de-passe-user
        restart: always

    volumes:
      db_data:
      nextcloud_data:
    ```

    > **Remarque :** Remplacez `exemple-mot-de-passe-root` et `exemple-mot-de-passe-user` par vos mots de passe sécurisés.

## Étape 3 : Lancer les Conteneurs Nextcloud

1. **Démarrer les Conteneurs** :
    ```sh
    docker-compose up -d
    ```

2. **Vérifier l'Installation** :
    ```sh
    docker-compose ps
    ```

## Étape 4 : Configurer Nextcloud

1. **Accéder à l'Interface Web de Nextcloud** :
   - Ouvrez votre navigateur et allez à `http://<IP_du_serveur>:8080`.

2. **Créer un Compte Administrateur** :
   - Fournissez un nom d'utilisateur et un mot de passe.
   - Configurez la connexion à la base de données en utilisant :
     - **Utilisateur** : `nextclouduser`
     - **Mot de passe** : (celui défini dans `docker-compose.yml`)
     - **Nom de la base de données** : `nextcloud`
     - **Hôte de la base de données** : `db`

3. **Terminer l'Installation** :
   - Cliquez sur "Terminer l'installation".

## Étape 5 : Sécuriser Nextcloud avec HTTPS

1. **Ajouter un Proxy Inverse avec Traefik** :

   Modifiez le fichier `docker-compose.yml` pour inclure **Traefik** :

    ```yaml
    version: '3.1'

    services:
      traefik:
        image: traefik
        container_name: traefik
        command:
          - "--api.insecure=true"
          - "--providers.docker"
          - "--entrypoints.web.address=:80"
          - "--entrypoints.websecure.address=:443"
          - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
          - "--certificatesresolvers.mytlschallenge.acme.email=admin@example.com"
          - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
        ports:
          - "80:80"
          - "443:443"
        volumes:
          - "/var/run/docker.sock:/var/run/docker.sock:ro"
          - "letsencrypt:/letsencrypt"
        restart: always

      db:
        image: mariadb
        container_name: nextcloud-db
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: exemple-mot-de-passe-root
          MYSQL_DATABASE: nextcloud
          MYSQL_USER: nextclouduser
          MYSQL_PASSWORD: exemple-mot-de-passe-user
        volumes:
          - db_data:/var/lib/mysql

      app:
        image: nextcloud
        container_name: nextcloud-app
        labels:
          - "traefik.http.routers.nextcloud.rule=Host(`nextcloud.example.com`)"
          - "traefik.http.routers.nextcloud.entrypoints=websecure"
          - "traefik.http.routers.nextcloud.tls.certresolver=mytlschallenge"
        volumes:
          - nextcloud_data:/var/www/html
        environment:
          - MYSQL_HOST=db
          - MYSQL_DATABASE=nextcloud
          - MYSQL_USER=nextclouduser
          - MYSQL_PASSWORD=exemple-mot-de-passe-user
        restart: always

    volumes:
      db_data:
      nextcloud_data:
      letsencrypt:
    ```

   > **Remarque :** Remplacez `admin@example.com` par votre adresse email et `nextcloud.example.com` par votre domaine.

2. **Redémarrer Docker Compose** :
    ```sh
    docker-compose down
    docker-compose up -d
    ```

## Étape 6 : Accéder à Nextcloud via HTTPS

- Ouvrez votre navigateur et allez à `https://nextcloud.example.com`.

## Conclusion

Vous avez maintenant installé Nextcloud avec Docker et sécurisé l'accès avec HTTPS. Pour plus d'informations sur la configuration de Nextcloud, consultez la [documentation officielle de Nextcloud](https://docs.nextcloud.com/).

---

Si vous avez des questions ou des problèmes, n'hésitez pas à ouvrir une issue sur ce dépôt.
