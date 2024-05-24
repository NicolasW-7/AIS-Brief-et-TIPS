# DHCP Relay

## Définition
DHCP Relay (Relais DHCP) est une fonctionnalité de réseau permettant aux requêtes DHCP d'être transmises entre clients et serveurs DHCP se trouvant sur différents sous-réseaux. Cela permet aux clients DHCP d'obtenir des adresses IP et d'autres informations de configuration réseau même si le serveur DHCP n'est pas situé sur le même segment de réseau.

## Fonctionnement

### Composants Principaux
- **Client DHCP** : L'appareil qui demande une adresse IP.
- **Serveur DHCP** : Le serveur qui attribue les adresses IP et autres informations de configuration réseau.
- **Agent de Relais DHCP** : Un routeur ou autre dispositif de couche 3 qui intercepte les requêtes DHCP des clients et les transmet au serveur DHCP situé sur un autre sous-réseau.

### Processus de Relais DHCP
1. **Requête du Client (DHCPDISCOVER)** : Le client DHCP envoie une requête de découverte (DHCPDISCOVER) en broadcast pour trouver un serveur DHCP.
2. **Interception par l'Agent de Relais** : L'agent de relais DHCP intercepte cette requête.
3. **Transmission au Serveur DHCP** : L'agent de relais DHCP encapsule la requête DHCP dans un paquet unicast et l'envoie au serveur DHCP sur un autre sous-réseau.
4. **Réponse du Serveur DHCP** : Le serveur DHCP répond à l'agent de relais DHCP avec une offre d'adresse IP (DHCPOFFER).
5. **Transmission au Client** : L'agent de relais DHCP transmet cette réponse au client DHCP.
6. **Processus de Négociation** : Le client DHCP continue le processus de négociation (DHCPREQUEST et DHCPACK) via l'agent de relais jusqu'à ce que l'adresse IP soit attribuée.

### Configuration de l'Agent de Relais DHCP
Pour configurer un agent de relais DHCP sur un routeur ou un autre dispositif réseau, les administrateurs doivent spécifier l'adresse IP du serveur DHCP vers lequel les requêtes doivent être relayées. 

## Avantages du DHCP Relay
- **Flexibilité** : Permet l'utilisation d'un serveur DHCP centralisé pour gérer plusieurs sous-réseaux, simplifiant ainsi l'administration.
- **Efficacité** : Réduit le besoin de déployer des serveurs DHCP sur chaque sous-réseau.
- **Centralisation** : Facilite la gestion et la mise à jour des configurations DHCP à partir d'un emplacement centralisé.


## Inconvénients du DHCP Relay
- **Complexité** : La configuration et la gestion peuvent être plus complexes, surtout dans de grands réseaux avec de nombreux sous-réseaux.
- **Dépendance** : Si l'agent de relais ou le serveur DHCP centralisé tombe en panne, cela peut affecter la capacité des clients à obtenir des adresses IP.
- **Sécurité** : Requiert des mesures de sécurité pour s'assurer que les requêtes DHCP ne sont pas interceptées ou manipulées malveillamment.

##Conclusion :
Le DHCP Relay est une fonctionnalité essentielle pour les réseaux comportant plusieurs sous-réseaux, permettant une gestion centralisée et efficace des adresses IP et autres configurations réseau. 
Bien que la mise en œuvre du DHCP Relay puisse introduire une certaine complexité, ses avantages en termes de flexibilité et de centralisation en font une solution précieuse pour les grandes infrastructures réseau.
