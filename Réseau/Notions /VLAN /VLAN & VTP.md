### VLANs (Virtual Local Area Networks)

**Définition**: 
Un VLAN (Virtual Local Area Network) est une technologie utilisée pour segmenter un réseau physique en plusieurs réseaux logiques distincts. Cette segmentation permet de regrouper des hôtes ayant des besoins similaires ou devant être isolés pour des raisons de sécurité ou de performance.



**Fonctionnement**:
- **Segmentation**: Les VLANs permettent de diviser un réseau en plusieurs sous-réseaux logiques. Chaque VLAN est un domaine de diffusion distinct.
- **Isolation**: Les dispositifs dans un VLAN ne peuvent pas communiquer directement avec des dispositifs dans un autre VLAN sans un routeur ou un dispositif de couche 3.
- **Identification**: Les trames Ethernet sont marquées avec un identifiant de VLAN (VLAN ID) dans le champ Tag du protocole 802.1Q. Cela permet aux switches de savoir à quel VLAN chaque trame appartient.
- **Avantages**:
  - **Sécurité**: Limite les points de diffusion des données, réduisant ainsi les risques d'écoute clandestine.
  - **Gestion du trafic**: Réduit le trafic de diffusion en limitant son étendue.
  - **Flexibilité**: Permet une organisation logique du réseau indépendamment de la localisation physique des appareils.

### VTP (VLAN Trunking Protocol)

**Définition**:
Le VTP (VLAN Trunking Protocol) est un protocole propriétaire de Cisco utilisé pour gérer la propagation des informations de VLANs à travers un domaine de commutation.

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Screenshots/667934740591808512.png)

**Fonctionnement**:
- **Propagation des VLANs**: VTP permet de créer, supprimer et renommer des VLANs sur un switch VTP server et de propager ces modifications automatiquement à tous les switches configurés en VTP client dans le domaine VTP.
- **Modes VTP**:
  - **Server**: Peut créer, modifier et supprimer des VLANs et propager ces informations aux autres switches.
  - **Client**: Reçoit les informations de VLAN du VTP server mais ne peut pas créer, modifier ou supprimer des VLANs.
  - **Transparent**: Ne participe pas au VTP mais retransmet les messages VTP sans les modifier. Les VLANs doivent être configurés manuellement sur chaque switch transparent.
- **Versions**: Il existe plusieurs versions de VTP (V1, V2 et V3), chacune apportant des améliorations en termes de fonctionnalité et de sécurité.

**Avantages**:
- **Centralisation**: Simplifie la gestion des VLANs en centralisant leur configuration.
- **Consistance**: Assure une configuration cohérente des VLANs sur tous les switches d'un même domaine.

**Inconvénients**:
- **Complexité**: La configuration et le dépannage peuvent être complexes, surtout dans de grands réseaux.
- **Risque de propagation d'erreurs**: Une mauvaise configuration sur un switch VTP server peut se propager à tous les switches clients, impactant tout le domaine.

### Conclusion

Les VLANs et le VTP sont des outils puissants pour la gestion et la segmentation des réseaux locaux. Les VLANs permettent une organisation logique et sécurisée du réseau, tandis que le VTP facilite la gestion de ces VLANs à grande échelle dans des environnements Cisco. Bien que très utiles, leur utilisation nécessite une compréhension claire et une configuration soignée pour éviter des problèmes potentiels de réseau.
