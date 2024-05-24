# Sécurité des Ports (Port Security)

## Définition
La sécurité des ports (Port Security) est une fonctionnalité de sécurité des commutateurs réseau qui permet de contrôler et de restreindre l'accès aux ports du commutateur en limitant le nombre de périphériques pouvant s'y connecter. Elle permet également de prendre des mesures spécifiques lorsque des violations sont détectées, telles que la connexion de périphériques non autorisés.

## Fonctionnement

### Composants Principaux
- **Port de Commutateur** : Interface sur le commutateur réseau où les périphériques se connectent.
- **Adresse MAC** : Identifiant unique attribué à chaque interface réseau d'un périphérique.
- **Table de Sécurité** : Liste des adresses MAC autorisées à se connecter à un port spécifique.

### Configuration de la Sécurité des Ports
La configuration de la sécurité des ports implique la définition de plusieurs paramètres :

- **Limite d'Adresses MAC** : Nombre maximum d'adresses MAC autorisées par port.
- **Adresses MAC Statique** : Adresses MAC spécifiques définies manuellement comme autorisées.
- **Apprentissage Dynamique** : Le commutateur apprend et enregistre automatiquement les adresses MAC des périphériques qui se connectent.

### Modes de Violation
Lorsque la sécurité des ports détecte une violation, elle peut prendre différentes actions selon la configuration :

- **Protect** : Les paquets provenant d'adresses MAC non autorisées sont ignorés, mais le port reste actif.
- **Restrict** : Les paquets provenant d'adresses MAC non autorisées sont ignorés et le commutateur enregistre les violations dans les journaux.
- **Shutdown** : Le port est désactivé immédiatement lorsqu'une violation est détectée.

## Avantages de la Sécurité des Ports
- **Contrôle d'Accès** : Limite les périphériques pouvant se connecter à chaque port, renforçant ainsi la sécurité réseau.
- **Prévention des Attaques** : Protège contre les attaques telles que le MAC flooding en limitant le nombre d'adresses MAC par port.
- **Surveillance et Journalisation** : Enregistre les tentatives de connexion non autorisées, aidant à la détection des intrusions et au dépannage.
- 
## Inconvénients de la Sécurité des Ports
- **Gestion** : Peut nécessiter une gestion et une maintenance accrues, surtout dans les environnements à grande échelle où les périphériques se déplacent fréquemment.
- **Disponibilité** : Les actions comme la désactivation des ports en cas de violation peuvent entraîner des interruptions de service si elles ne sont pas gérées correctement.
- **Complexité** : La configuration incorrecte des paramètres de sécurité des ports peut entraîner des problèmes d'accès réseau.

## Meilleures Pratiques
- **Surveiller les Logs** : Surveiller régulièrement les journaux pour détecter et répondre rapidement aux violations.
- **Configurer des Adresses MAC Statique** : Dans les environnements stables, définir manuellement les adresses MAC pour réduire les risques.
- **Combiner avec d'Autres Mesures de Sécurité** : Utiliser la sécurité des ports en conjonction avec d'autres mesures de sécurité réseau telles que 802.1X pour renforcer la protection.

### Conclusion
La sécurité des ports est un outil puissant pour renforcer la sécurité réseau en contrôlant l'accès aux ports du commutateur.
Bien que son déploiement puisse introduire des défis de gestion et de complexité, ses avantages en termes de prévention des accès non autorisés et de protection contre les attaques réseau en font une composante essentielle des stratégies de sécurité réseau.
