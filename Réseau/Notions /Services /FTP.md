FTP (File Transfer Protocol)
Définition
FTP (File Transfer Protocol) est un protocole standard de réseau utilisé pour transférer des fichiers entre un client et un serveur sur un réseau TCP/IP.

Fonctionnement
FTP utilise deux connexions distinctes entre le client et le serveur : une connexion de commande et une connexion de données.

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Screenshots/How-FTP-works.png)

Port de Commande : Par défaut, le port 21 est utilisé pour envoyer les commandes et recevoir les réponses.
Port de Données : Par défaut, le port 20 est utilisé pour le transfert réel des fichiers.
Modes de Fonctionnement
Mode Actif : Le client ouvre un port et attend que le serveur se connecte à ce port pour transférer les données.
Mode Passif : Le serveur ouvre un port et attend que le client se connecte à ce port pour transférer les données. Ce mode est souvent utilisé pour traverser les pare-feu.
Avantages
Simplicité : Simple à implémenter et à utiliser pour transférer des fichiers.
Large Adoption : Supporté par presque tous les systèmes d'exploitation et les outils de transfert de fichiers.
Inconvénients
Sécurité : Les données, y compris les identifiants, sont envoyées en clair, rendant FTP vulnérable aux interceptions. FTPS et SFTP sont des alternatives plus sécurisées.
