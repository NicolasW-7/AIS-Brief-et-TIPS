# NextCloud sur Debian
**Support Nextcloud** : https://github.com/nextcloud

# Qu'est-ce que Nextcloud ?

**Nextcloud** est une plateforme open-source pour le stockage et la collaboration en ligne, offrant une solution complète pour la gestion des fichiers et la collaboration en équipe. Voici un aperçu de ses principales fonctionnalités :

| **Catégorie**             | **Fonctionnalités**                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------------|
| **Stockage de Fichiers**  | - **Gestion des fichiers** : Stockez, synchronisez et partagez vos fichiers en toute sécurité.         |
|                           | - **Partage** : Contrôlez qui peut accéder à vos fichiers et comment ils peuvent les utiliser.         |
| **Collaboration**         | - **Calendriers partagés** : Gérez et partagez des calendriers avec vos collègues.                     |
|                           | - **Contacts** : Centralisez vos contacts et partagez-les facilement.                                 |
|                           | - **Applications intégrées** : Utilisez des outils pour la gestion des tâches et des projets.           |
| **Sécurité et Confidentialité** | - **Chiffrement** : Protégez vos données avec des fonctionnalités de chiffrement.                 |
|                           | - **Contrôles d'accès** : Définissez des règles précises pour l'accès aux fichiers et aux données.     |
|                           | - **Politique de sécurité** : Configurez des politiques de sécurité adaptées à vos besoins.            |
| **Extensibilité**         | - **Applications supplémentaires** : Étendez les fonctionnalités de Nextcloud avec des applications tierces. |
|                           | - **Intégrations** : Connectez Nextcloud à d'autres outils et services selon vos besoins.              |
| **Déploiement**           | - **Installation** : Déployez Nextcloud sur des serveurs personnels ou professionnels.                 |
|                           | - **Contrôle local** : Gardez le contrôle total de vos données avec un déploiement local.              |

En résumé, Nextcloud est une solution flexible et sécurisée pour la gestion et le partage de fichiers, adaptée aussi bien pour un usage personnel que professionnel.




## Prérequis

- **Serveur** : Serveur physique ou virtuel avec :
  - **CPU** : 2 cœurs minimum
  - **RAM** : 4 Go minimum
  - **Stockage** : Prévoir suffisamment d'espace pour vos données (1 To ou plus recommandé) Prévoir le RAID à utiliser si besoin (cf.#Bonus en bas de page).
- **Système d'exploitation** : Linux (Ubuntu 22.04, Debian 11, CentOS, etc.)
- **Accès administrateur** : Root ou utilisateur avec privilèges `sudo`.

## Installation de Nextcloud

*Pour cette installation on travail à partir d'une machine Debian12 sans interface de bureau avec une prise de contrôle à distance (SSH)*


### Mise à jour du système

Avant de commencer l'installation, assurez-vous que votre système est à jour :

```bash
sudo apt update && apt-get upgrade
```

### Installation des dépendances

Installez les paquets nécessaires pour Nextcloud :

```bash
apt-get -y install apache2 curl apache2-doc apache2-utils libapache2-mod-php8.2 php8.2 php8.2-common php8.2-gd php8.2-mysql php8.2-imap php8.2-cli libapache2-mod-fcgid apache2-suexec-pristine php-pear mcrypt imagemagick libruby libapache2-mod-python php8.2-curl php8.2-intl php8.2-pspell php8.2-sqlite3 php8.2-tidy php8.2-xmlrpc php8.2-xsl php-imagick php8.2-zip php8.2-mbstring php8.2-soap php8.2-fpm php8.2-opcache php8.2-apcu a2enmod suexec rewrite ssl include dav_fs dav auth_digest expires headers fastcgi actions proxy_fcgi a2enconf php8.2-fpm unzip
```

#### (Optionnel) 

Si vous rencontrer un problème avec le paquet php8.2

- Ajouter le dépôt Sury pour PHP :

Exécutez les commandes suivantes pour ajouter le dépôt Sury à votre système :

```bash
sudo apt update
sudo apt install -y lsb-release ca-certificates apt-transport-https software-properties-common gnupg2
```

- Ajouter le dépôt Sury

```bash
sudo wget -qO /etc/apt/trusted.gpg.d/sury-php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
```

- Mettre à jour les dépôts et installer PHP 8.2 FPM :

```bash
sudo apt update
sudo apt install -y php8.2-fpm
```

### Configuration de MariaDB

Installer MariaDB & lancer MariaDB

```bash
sudo apt install mariadb-server mariadb-client
sudo systemctl start mariadb
sudo systemctl enable mariadb
```


#### 1. Sécurisez l'installation de MariaDB :

```bash
sudo mysql_secure_installation
```

Suivez les instructions pour configurer le mot de passe root et sécuriser votre installation.

#### 2. Connectez-vous à MariaDB :

```bash
sudo mysql -u root -p
```

#### 3. Créez une base de données et un utilisateur pour Nextcloud :

*Entrée les lignes suivantes à la suite les unes des autres*

```sql
CREATE DATABASE nextcloud;
CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'motdepasse';
GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextclouduser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
*Remplacez 'motdepasse' par un mot de passe sécurisé.*
**Conservez bien ces informations elle vous seront redemandée plus tard par nextcloud pour installer la base de données**

### Installation de Nextcloud

#### 1. Téléchargez la dernière version de Nextcloud :

Allez sur le site de Nextcloud pour obtenir le lien de téléchargement ou utilisez wget :

```bash 
wget https://download.nextcloud.com/server/releases/latest.zip
```

#### 2. Décompressez l'archive et déplacez les fichiers :

```bash
unzip latest.zip

#Optionnel
rm latest.zip

sudo mv nextcloud /var/www/html/
```

#### 3. Définissez les permissions appropriées & structure du projet :

```bash
groupadd web001
useradd -M -g web001 -s /usr/sbin/nologin web001

mkdir -p /var/www/nextcloud/web
mkdir -p /var/www/nextcloud/log
mkdir -p /var/www/nextcloud/tmp

chown -R web001:web001 /var/www/nextcloud/web
chown -R web001:web001 /var/www/nextcloud/tmp
```

### Configuration PHP FPM

On crée le fichier suivant : 

```bash
nano /etc/php/8.2/fpm/pool.d/VotreNomDeServeur.conf
```

Vous pouvez copier en le modifiant ceci:

```php
[VotreNomDeServeur]

listen = /run/php/VotreNomDeServeur.sock
listen.owner = web0
listen.group = www-data
listen.mode = 0660

user = web001
group = web001

pm = dynamic
pm.max_children = 10
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 5
pm.max_requests = 0

chdir = /

php_admin_value[open_basedir] = /var/www/nextcloud/web:/var/www/nextcloud/tmp:/usr/share/php:/tmp:/dev/urandom:/
php_admin_value[session.save_path] = /var/www/nextcloud/tmp
php_admin_value[upload_tmp_dir] = /var/www/nextcloud/tmp
php_admin_value[sendmail_path] = "/usr/sbin/sendmail -t -i -VotreNomDeServeur"
```

### Création du Vhost

```bash
sudo nano /etc/apache2/sites-available/VotreNomNextcloud.conf
```

Ajoutez le contenu suivant : 

```apache
<Directory /var/www/nextcloud>
        AllowOverride None
        Require all denied
</Directory>

<VirtualHost *:80>
                DocumentRoot /var/www/nextcloud/web

                ServerName VotreNomDeServeur
                ServerAdmin webmaster@VotreNomDeServeur
                
                CustomLog /var/www/nextcloud/log/access.log combined
                ErrorLog /var/www/nextcloud/log/error.log

                SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1

                <Directory /var/www/nextcloud/web>                   
                    Options +FollowSymLinks -Indexes
                    AllowOverride All
                    Require all granted
                </Directory>

                <Directory /var/www/nextcloud/web>
                    <FilesMatch ".+\.ph(p[3457]?|t|tml)$">
                        SetHandler "proxy:unix:/run/php/VotreNomDeServeur.sock|fcgi://localhost"
                    </FilesMatch>
                </Directory>

                <IfModule mod_dav_fs.c>
                    # Do not execute PHP files in webdav directory
                    <Directory /var/www/nextcloud/webdav>
                        <FilesMatch "\.ph(p3?|tml)$">
                            SetHandler None
                        </FilesMatch>
                    </Directory>
                    DavLockDB /var/www/nextcloud/tmp/DavLock
                </IfModule>

            <IfModule mod_headers.c>
                Header always set X-Content-Type-Options "nosniff"
                Header always set X-Frame-Options "DENY"
                Header always set X-XSS-Protection "1; mode=block"
                Header always set Referrer-Policy "no-referrer"
            </IfModule>
            
            Protocols h2 h2c http/1.1
</VirtualHost>
```
On execute ensuite : 

```bash
a2ensite VotreNomDeServeur
```

### Optimisation Apache & PHP
On ouvre le fichier suivant : 

```bash
nano /etc/apache2/conf-enabled/security.conf
```
On modifie ces 2 lignes : 

```bash
ServerTokens Prod
ServerSignature Off
```

Ensuite dans le fichier *opcahce.ini* on va ajouter ceci : 

```bash
nano /etc/php/8.2/fpm/conf.d/10-opcache.ini
```

```bash
opcache.enable=1
opcache.enable_cli=0
opcache.memory_consumption=512
opcache.interned_strings_buffer=32
opcache.max_accelerated_files=60229
opcache.max_wasted_percentage=10
opcache.revalidate_freq=10
opcache.fast_shutdown=1
opcache.enable_file_override=0
opcache.max_file_size=0
opcache.jit = 1255
opcache.jit_buffer_size = 128M
```

On execute ensuite à la suite ces commandes :

```bash
a2dismod php8.2
#(Ligne suivante optionnelle si demandée)
a2dismod php7.4
a2dismod mpm_prefork
a2enmod mpm_event
systemctl restart apache2
a2enmod http2
systemctl restart apache2
```

### 6. Configuration de Nextcloud via le navigateur

#### 1. Accédez à l'URL de votre Nextcloud :

Ouvrez un navigateur web et allez à http://votre-domaine.com ou http://adresse-ip.

#### 2. Complétez la configuration via l'interface web :

- Créer un compte administrateur : Entrez un nom d'utilisateur et un mot de passe pour le compte administrateur.
- Configuration de la base de données : Sélectionnez MySQL/MariaDB, entrez les informations de la base de données (nom de la base de données, utilisateur, mot de passe).
- Terminez l'installation en cliquant sur "Terminer l'installation".

### 7.Configuration du pare-feu (optionnel)
Si vous utilisez ufw pour gérer votre pare-feu, autorisez le trafic HTTP et HTTPS :
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Conclusions 
Votre installation de Nextcloud est maintenant terminée et devrait être opérationnelle. Si vous avez des questions supplémentaires ou rencontrez des problèmes, n'hésitez pas à envoyer des demandes sur mon dépôt GitHub. Je serai ravi de vous aider !

### Bonus Tableau RAID

| Type de RAID | Nombre de disques | Défaillances de disques tolérables | Description | Capacité de stockage |
|--------------|-------------------|------------------------------------|-------------|-----------------------|
| SHR          | 1                 | 0                                  | Optimise la taille du volume lorsque des disques de différentes tailles sont associés. Fournit la redondance des données si le volume est composé de deux disques ou plus. Recommandé pour les utilisateurs débutants. | 1 x (taille du disque) |
|              | 2-3               | 1                                  | Optimisé par le système. |                   |
|              | ≧4                | 1-2                                |             |                       |
| Basic        | 1                 | 0                                  | Composé d'un disque en tant qu'unité indépendante. Ne dispose pas de la redondance des données. | 1 x (taille du disque) |
| JBOD         | ≧1                | 0                                  | Combine une collection de disques en un espace de stockage unique avec une capacité égale à la somme des capacités des disques. Ne dispose pas de la redondance des données. | Somme des tailles de tous les disques |
| RAID 0       | ≧2                | 0                                  | Propose « l'agrégation par bandes », un processus consistant à diviser les données en blocs et à répartir ces blocs sur plusieurs disques pour améliorer les performances. Ne dispose pas de la redondance des données. | Somme des tailles de tous les disques |
| RAID 1       | 2                 | 1                                  | Écrit des données identiques sur tous les disques simultanément. Fournit la redondance des données. | Taille du plus petit disque |
|              | 3                 | 2                                  |             |                       |
|              | 4                 | 3                                  |             |                       |
| RAID 5       | ≧3                | 1                                  | Met en œuvre l'agrégation par bandes au niveau des blocs, avec la parité des données distribuée sur tous les disques membres, fournissant ainsi une redondance des données plus efficace que RAID 1. | (N - 1) x (taille du plus petit disque) |
| RAID 6       | ≧4                | 2                                  | Implémente deux couches de parité de données pour stocker des données redondantes de la taille de deux disques, fournissant un degré supérieur de redondance des données par rapport à RAID 5. Prend en charge la création d'un volume Btrfs d'une taille maximale de 1 Po, disponible uniquement sur certains modèles de Synology NAS et dans des conditions spécifiques. | (N - 2) x (taille du plus petit disque) |
| RAID 10      | ≧4 (nombre pair)  | 0                                  | Fournit la performance de RAID 0 et le niveau de protection des données de RAID 1, combinant les disques en groupes de deux dans lesquels les données sont dupliquées en miroir. | (N / 2) x (taille du plus petit disque) |
| RAID F1       | ≧3                | 1                                  | Implémente l'agrégation par bandes au niveau des blocs, avec la parité des données distribuée sur tous les disques membres. Écrit davantage d'informations de parité sur un certain disque. Recommandé pour les matrices exclusivement en flash. | (N - 1) x (taille du plus petit SSD) |

## Glossaire

### Apache

**Description** : Serveur web open-source qui fournit des fonctionnalités robustes pour servir des pages web. Apache est souvent utilisé pour héberger des sites web dynamiques, comme Nextcloud.

**Commandes clés** : `a2enmod`, `a2dismod`, `a2ensite`, `a2dissite`

### PHP

**Description** : Langage de script open-source principalement utilisé pour le développement web côté serveur. PHP est essentiel pour exécuter des scripts sur le serveur web, comme ceux utilisés par Nextcloud.

**Commandes clés** : `php -v`, `php.ini`, `php-fpm`

### MariaDB

**Description** : Système de gestion de base de données relationnelle open-source, utilisé comme alternative à MySQL. MariaDB est utilisé pour stocker les données de Nextcloud.

**Commandes clés** : `mysql`, `mysql_secure_installation`, `CREATE DATABASE`, `GRANT PRIVILEGES`

### RAID

**Description** : Technologie qui permet de combiner plusieurs disques durs en un seul volume logique pour améliorer les performances ou la redondance des données. RAID peut être configuré de différentes manières pour atteindre des objectifs spécifiques.


### PHP-FPM (FastCGI Process Manager)

**Description** : Alternative à l'exécution de PHP via le module mod_php dans Apache. PHP-FPM gère les processus PHP de manière plus efficace, ce qui est souvent utilisé avec des configurations à haute charge.

### SSL (Secure Sockets Layer)

**Description** : Protocole de sécurité pour chiffrer les données échangées entre un serveur web et un client, garantissant la confidentialité et l'intégrité des informations. Utilisé pour sécuriser les connexions HTTPS.

### UFW (Uncomplicated Firewall)

**Description** : Interface pour gérer le pare-feu sur les systèmes Ubuntu et Debian. Permet de configurer les règles de filtrage de manière simple.

### Nextcloud

**Description** : Plateforme open-source pour la gestion de fichiers, le stockage et la collaboration en ligne. Permet de stocker, synchroniser et partager des fichiers ainsi que de collaborer avec des outils intégrés comme des calendriers et des contacts.

### Debian

**Description** : Distribution Linux stable et largement utilisée, connue pour sa robustesse et sa flexibilité. Debian est souvent le choix préféré pour les serveurs.

### SSH (Secure Shell)

**Description** : Protocole de communication sécurisé pour accéder à des serveurs à distance. Utilisé pour les connexions sécurisées en ligne de commande.
