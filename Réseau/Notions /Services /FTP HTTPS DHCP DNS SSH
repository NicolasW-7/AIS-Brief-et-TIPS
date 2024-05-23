# Services Réseau : FTP, HTTPS, DHCP, DNS , SSH

## FTP (File Transfer Protocol)

### Définition
FTP (File Transfer Protocol) est un protocole standard de réseau utilisé pour transférer des fichiers entre un client et un serveur sur un réseau TCP/IP.

### Fonctionnement
FTP utilise deux connexions distinctes entre le client et le serveur : une connexion de commande et une connexion de données.

- **Port de Commande** : Par défaut, le port 21 est utilisé pour envoyer les commandes et recevoir les réponses.
- **Port de Données** : Par défaut, le port 20 est utilisé pour le transfert réel des fichiers.

### Modes de Fonctionnement
- **Mode Actif** : Le client ouvre un port et attend que le serveur se connecte à ce port pour transférer les données.
- **Mode Passif** : Le serveur ouvre un port et attend que le client se connecte à ce port pour transférer les données. Ce mode est souvent utilisé pour traverser les pare-feu.

### Avantages
- **Simplicité** : Simple à implémenter et à utiliser pour transférer des fichiers.
- **Large Adoption** : Supporté par presque tous les systèmes d'exploitation et les outils de transfert de fichiers.

### Inconvénients
- **Sécurité** : Les données, y compris les identifiants, sont envoyées en clair, rendant FTP vulnérable aux interceptions. FTPS et SFTP sont des alternatives plus sécurisées.

## HTTPS (HyperText Transfer Protocol Secure)

### Définition
HTTPS (HyperText Transfer Protocol Secure) est une version sécurisée du protocole HTTP, utilisant SSL/TLS pour chiffrer les communications entre le client et le serveur.

### Fonctionnement
- **Port** : HTTPS utilise par défaut le port 443.
- **Chiffrement** : Utilise SSL/TLS pour chiffrer les données, assurant la confidentialité et l'intégrité des informations échangées.
- **Certificats** : Utilise des certificats numériques pour authentifier le serveur (et parfois le client).

### Avantages
- **Sécurité** : Protège contre les interceptions et les attaques de type man-in-the-middle.
- **Confiance** : Les certificats numériques assurent aux utilisateurs que le site est authentique et sécurisé.

### Inconvénients
- **Performance** : Le chiffrement/déchiffrement des données peut introduire une latence supplémentaire.
- **Coût** : L'obtention et la gestion de certificats SSL/TLS peuvent engendrer des coûts.

## DHCP (Dynamic Host Configuration Protocol)

### Définition
DHCP (Dynamic Host Configuration Protocol) est un protocole de réseau qui permet de configurer dynamiquement les paramètres IP des dispositifs sur un réseau, facilitant leur intégration et leur gestion.

### Fonctionnement
- **Serveur DHCP** : Alloue automatiquement des adresses IP et d'autres informations de configuration réseau aux clients DHCP.
- **Client DHCP** : Demande une adresse IP au serveur DHCP lors de sa connexion au réseau.

### Processus DHCP
1. **Découverte (DHCPDISCOVER)** : Le client envoie une requête pour trouver les serveurs DHCP disponibles.
2. **Offre (DHCPOFFER)** : Les serveurs DHCP répondent avec une offre d'adresse IP.
3. **Demande (DHCPREQUEST)** : Le client choisit une offre et demande l'allocation de l'adresse IP.
4. **Accusé de Réception (DHCPACK)** : Le serveur confirme l'allocation de l'adresse IP.

### Avantages
- **Automatisation** : Simplifie la gestion des adresses IP et réduit les erreurs de configuration.
- **Flexibilité** : Permet de réutiliser dynamiquement les adresses IP non utilisées.

### Inconvénients
- **Sécurité** : Peut être vulnérable aux attaques DHCP spoofing et DHCP starvation si non sécurisé.
- **Dépendance** : Le réseau dépend du serveur DHCP pour la configuration IP, et une panne de ce serveur peut affecter le réseau.

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

## SSH (Secure Shell)

### Définition
SSH (Secure Shell) est un protocole de réseau cryptographique utilisé pour sécuriser les communications réseau, principalement pour l'administration à distance des systèmes.

### Fonctionnement
- **Port** : SSH utilise par défaut le port 22.
- **Processus de Connexion** :
  1. **Client SSH** : Établit une connexion sécurisée avec le serveur SSH.
  2. **Serveur SSH** : Authentifie le client et fournit un accès sécurisé en ligne de commande.

### Avantages
- **Sécurité** : Offre un chiffrement fort pour les communications, assurant la confidentialité et l'intégrité des données.
- **Fonctionnalités** : Supporte le tunneling sécurisé, la redirection de port et les connexions SFTP.

### Inconvénients
- **Complexité** : Peut être plus complexe à configurer et à gérer par rapport à Telnet.
- **Performance** : Le chiffrement/déchiffrement peut introduire une légère surcharge sur les ressources système.

