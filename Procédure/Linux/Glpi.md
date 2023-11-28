# ***Création d'un serveur GLPI***

Dans ce guide, nous allons installer et configurer un helpdesk « GLPI » (version stable 10.0.6).

Nous avons réalisé ce guide à partir d’une machine virtuelle Debian 12 réalisée sur VMWare Workstation pro 17. 
La mémoire vive affectée à cette machine est de 1 Go et le disque dur a été configuré avec une capacité de stockage de 8 Go.

Prérequis :

- Une machine Debian 12 / Ip static 
- La machine a accès à Internet

**Toutes les commandes sont entrées soient directement avec la session root soit avec une cession disposant des droits d'administrateur**


### 1. Mise à jour des paquets Debian

On commence par mettre à jour les paquets présents :

````
apt update && apt upgrade
````

### 2. Installation du serveur LAMP ( Apache MariaDB PHP )

#### a) Installation d'Apache

```` 
apt install apache2
````

#### b) Installation PHP8.2

- Installation des dépendances
  ````
  apt install ca-certificates apt-transport-https software-properties-common wget curl lsb-release -y
   ````
  
- Importation de la clé et du référentiel GPG
   ````
   curl -sSL https://packages.sury.org/php/README.txt | bash -x
   apt update
   apt upgrade

    ````
- Installation de PHP8.2

  ````
  apt install php8.2 libapache2-mod-php8.2
  systemctl restart apache2

  ````

#### c) Installation de MariaDB

````
  apt install mariadb-server
  mysql_secure_installation
````
**Après cette commande vous créez votre mot de passe, vous pouvez ensuite faire entrer (excepter la demande de changement de mot de passe) jusqu'à la fin**


### 3. Création de la base de données « GLPI »

On va connecter MariaDB et créer la base de données. 

```` 
mysql -u root -p
 ````

Nous sommes connectés sur MariaDB on va ensuite créer la base de données : 

````

create database glpi; 
create user 'glpi'@'localhost' identified by 'glpi'; 
grant all privileges on glpi.* to 'glpi'@'localhost' with grant option; 
flush privileges; 
quit

````

### 4. Téléchargement et décompression de l’archive « GLPI »

On va récuperer le GLPi à l'aide du lien de téléchargement. 

Lien de téléchargement de la dernière version de GLPI (10.0.6 – Février 2023) :

````

wget https://github.com/glpi-project/glpi/releases/download/10.0.6/glpi-10.0.6.tgz

````

On décompresse ensuite l'archive: 

````

tar xvf glpi-10.0.6.tgz

````

Le fichier décompresser s'appelle "GLPI" on va ensuite le déplacer dans /var/www/html/glpi

````
mv glpi /var/www/html/glpi
 ````

### 5. Installation GLPI 10.0.6

Ajout des modules PHP pour GLPI

````

apt install php8.2-curl php8.2-gd php8.2-mbstring php8.2-zip php8.2-xml php8.2-ldap php8.2-intl php8.2-mysql php8.2-dom
php8.2-simplexml php-json php8.2-phpdbg php8.2-cgi

````

On commence par donner la propriété du dossier GLPI à l’administrateur d’Apache (le « www-data ») et on accorde les droites nécessaires :

````

chown -R www-data:www-data /var/www/html/glpi/
chmod -R 755 /var/www/html/glpi/

````

On redémarre le serveur Apache :

````

systemctl restart apache2

````

Pour terminer l’installation de l’helpdesk GLPI, il suffit d’ouvrir le navigateur et de saisir, dans la barre d’adresse, l’IP de votre serveur web Apache suivi de /glpi 
Si vous êtes sur un Debian en interface de bureau (non recommandé) vous pouvez ouvrir un moteur de recherche sur votre machine et entrée localhost/glpi

Vous arrivez donc sur cette page : 

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI1.png)

Vous selectionnez la langue souhaitée, puis : 

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI2.png)

On accepte les termes du contrat ensuite comme il s’agit d’une première installation, on clique sur le bouton « Installer ». 

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI3.png)

On aura ensuite une liste de tout les modules requis à l'installation, vérifier que tous sont biens reconnues et/ou installer pour continuer l'installation. 

La 1ère étape consiste à se loguer au serveur SQL (MariaDB). On indique « localhost » et l’utilisateur « glpi » précédemment
configuré (avec son mot de passe !) et on clique sur le bouton « Continuer » :

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI4.png)

La connexion à la base « glpi » doit s’effectuer (message « Connexion à la base de données réussie »). Si la
connexion est fonctionnelle, la base « glpi » apparaît. On la sélectionne et on clique le bouton « Continuer » 

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI5.png)

On déploie ensuite la base de données. 

La fin de l’assistant s’affiche et des identifiants de tests sont fournis. Le logiciel est prêt à être utilisé. 

Cliquez le bouton « Utiliser GLPI », les identifiants de base « glpi » - « glpi »

Lors de la première connexion, GLPI affichera ce message :

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Crypto/Screenshots/GLPI6.png)

Pour changer les mots de passe des utilisateurs par défaut, il suffit de cliquer sur le lien hypertexte de ces derniers et de modifier
le mot de passe dans le profil.
Pour le fichier « install.php », il faudra revenir sur notre serveur web (Debian) et taper cette commande pour supprimer le fichier
par mesure de sécurité :

````

rm -f /var/www/html/glpi/install/install.php

````

Une fois le fichier supprimer vous pouvez personnaliser tous les utilisteurs, **surtout le superadmin** 

**GLPI est maintenant fonctionnel, installé et configuré avec sa base de données**
