# Installation de Snort3 avec toutes les dépendances et utilitaires

# Ce guide fournit une vue d'ensemble complète de l'installation de Snort3, y compris les étapes pour résoudre les problèmes éventuels avec `libdaq`.

## Étape 1 : Mettre à jour le système

Assurez-vous que votre système est à jour :
```bash
sudo apt update
sudo apt upgrade -y
```
## Étape 2 : Installer les dépendances requises

Installez les outils de développement, les bibliothèques et autres utilitaires nécessaires :

```bash
sudo apt install -y build-essential autotools-dev libpcap-dev libpcre3-dev \
libdumbnet-dev zlib1g-dev liblzma-dev openssl libssl-dev cpputest libsqlite3-dev \
uuid-dev pkg-config cmake libtool git autoconf bison flex libunwind-dev \
libmnl-dev ethtool
```
## Étape 3 : Installation de DAQ

Installer DAQ :

```bash
git clone https://github.com/snort3/libdaq.git
cd libdaq
```

Si le script ./configure n'est pas disponible, suivez les étapes ci-dessous pour résoudre le problème.

Assurez-vous que les outils nécessaires sont installés :

```bash
sudo apt-get install -y autoconf automake libtool
```
Réexécutez le script bootstrap :

```bash
./bootstrap
```

Vérifiez les erreurs lors de l'exécution de bootstrap : Si des erreurs apparaissent, consultez les messages d'erreur pour identifier les dépendances manquantes.

Exécutez autoreconf si bootstrap échoue :

```bash
autoreconf -fvi
```

Configurer et installer DAQ :

```bash
./configure
make -j$(nproc)
sudo make install
```


## Étape 4 : Télécharger et installer Snort3
Cloner le dépôt Snort3 :

```bash

git clone https://github.com/snort3/snort3.git
cd snort3
```

Générer les fichiers de configuration :

```bash
./configure_cmake.sh --prefix=/usr/local
```

Construire et installer Snort3 :

```bash
cd build
make -j$(nproc)
sudo make install
```

## Étape 5 : Vérifier l'installation
Pour vérifier que Snort3 est installé correctement, utilisez la commande suivante :

```bash
/usr/local/bin/snort -V
```

## Étape 5 : Installer des utilitaires supplémentaires (optionnel)

Installer LuaJIT (requis pour la configuration de Snort) :

```bash
sudo apt install -y luajit libluajit-5.1-dev
```

Après avoir suivi ces étapes, Snort3 devrait être entièrement installé avec toutes ses dépendances et utilitaires. Vous pouvez maintenant configurer Snort selon vos besoins en matière de sécurité réseau.
