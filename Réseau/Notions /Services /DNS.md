## DNS (Domain Name System)

### Définition
DNS (Domain Name System) est un système hiérarchique et décentralisé de noms de domaine qui traduit les noms de domaine lisibles par l'homme en adresses IP, permettant ainsi la localisation et l'accès aux ressources sur Internet.

### Fonctionnement
- **Résolution de Nom** : Le processus de traduction d'un nom de domaine en adresse IP.
- **Serveurs DNS** : Incluent les serveurs racine, les serveurs de domaine de premier niveau (TLD) et les serveurs faisant autorité.

### Types de Requêtes DNS
- **Requête Recursive** : Le client demande à un serveur DNS de trouver l'adresse IP et de revenir avec une réponse complète.
- **Requête Iterative** : Le client permet au serveur DNS de répondre avec l'adresse IP du serveur DNS suivant dans la chaîne de résolution.

### Avantages
- **Facilité d'Utilisation** : Permet aux utilisateurs d'utiliser des noms de domaine lisibles et mémorisables plutôt que des adresses IP numériques.
- **Redondance et Fiabilité** : Le système DNS est distribué et redondant, assurant une haute disponibilité.

### Inconvénients
- **Sécurité** : Peut être vulnérable aux attaques telles que le DNS spoofing, DNS cache poisoning, et DDoS.
- **Latence** : La résolution DNS peut introduire un délai, particulièrement si plusieurs requêtes sont nécessaires pour résoudre un nom de domaine.
