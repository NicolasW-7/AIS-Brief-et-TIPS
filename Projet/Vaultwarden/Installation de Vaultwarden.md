# Installtion de Vaultwarden

## Installation de docker 


## Configurer le dépôt de Docker

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

