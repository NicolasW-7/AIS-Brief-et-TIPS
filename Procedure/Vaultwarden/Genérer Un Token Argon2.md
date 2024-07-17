# Token Argon2 Pour Vaultwarden

## Argon 2 ?

*Argon2 est un algorithme de dérivation de clé conçu pour le hachage sécurisé des mots de passe.*

## Comment créer ce token ? 

Pour créer le jeton on à besoin de taper cette commande : 

```sh
docker run --rm -it vaultwarden/server /vaultwarden hash
```

On spéficie ensuite le mot de passe souhaité, on obtiens alors un token sous ce format : 

```sh
ADMIN_TOKEN=$argon2id$v=19$m=65540,t=3,p=4$CeciEstUnExempleDeTokenArgon2$abcdef+GhIJK1Mn0qr5TUvWxyZ
```

On peux alors ouvrir notre fichier **docker-compose.yml**

## Mettre en place le jeton

Il faut préalablement stopper les containers en route et les supprimer : 

#### `docker stop <container_id>` / `docker rm <container_id>`
- `docker stop <container_id>` : Arrête un conteneur en cours d'exécution.
- `docker rm <container_id>` : Supprime un conteneur arrêté.

*From: https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Procedure/Docker/Installation%20Docker.md*

**A vérifier** mais vous devez supprimer le fichier config.json et les fichiers db. qui gardent l'ancien Token d'admin

Vous ajouter alors votre Token Argon2 au fichier docker-compose.yml : 

```sh
WEBSOCKET_ENABLED: true
      # Reference the secret
      ADMIN_TOKEN: $$argon2id$$v=19$$m=65540,t=3,p=4$$CeciEstUnExempleDeTokenArgon2$$abcdef+GhIJK1Mn0qr5TUvWxyZ
    volumes:
      - vw-data:/data
```

On remplace donc : 

- Les simple $ par des double 
- Le = par :
- et on ajoute un espace

```sh
ADMIN_TOKEN=$argon2id$v=19$m=65540,t=3,p=4$CeciEstUnExempleDeTokenArgon2$abcdef+GhIJK1Mn0qr5TUvWxyZ
ADMIN_TOKEN: $$argon2id$$v=19$$m=65540,t=3,p=4$$CeciEstUnExempleDeTokenArgon2$abcdef+GhIJK1Mn0qr5TUvWxyZ
```

On peux alors reload nos containers avec un : 

```
docker compose up -d
```

Et tester dans : https://mon.vaultwarden.mon.domaine/**admin**

On entre le token entrer à lors de la création du token argon2