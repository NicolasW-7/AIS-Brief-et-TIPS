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
