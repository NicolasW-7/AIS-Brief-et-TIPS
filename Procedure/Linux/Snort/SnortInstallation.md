# Installation de Snort3 avec toutes les dépendances et utilitaires

# Ce guide fournit une vue d'ensemble complète de l'installation de Snort3, y compris les étapes pour résoudre les problèmes éventuels avec `libdaq`.

## Étape 1 : Mettre à jour le système

Assurez-vous que votre système est à jour :
```bash
sudo apt-get update
sudo apt-get upgrade -y
```
## Étape 2 : Installer les dépendances requises

Installez les outils de développement, les bibliothèques et autres utilitaires nécessaires :

```bash
sudo apt-get install -y build-essential autotools-dev libdumbnet-dev libluajit-5.1-dev libpcap-dev \
zlib1g-dev pkg-config libhwloc-dev cmake liblzma-dev openssl libssl-dev cpputest libsqlite3-dev \
libtool uuid-dev git autoconf bison flex libcmocka-dev libnetfilter-queue-dev libunwind-dev \
libmnl-dev ethtool libjemalloc-dev
```
## Étape 3 : Installation de DAQ

```
mkdir snort
cd /snort
```

Installer DAQ :

```bash
sudo git clone https://github.com/snort3/libdaq.git
cd libdaq
```

Si le script ./configure n'est pas disponible, suivez les étapes ci-dessous pour résoudre le problème.

Assurez-vous que les outils nécessaires sont installés :

```bash
sudo apt-get install -y autoconf automake libtool
```
Réexécutez le script bootstrap :

```bash
sudo ./bootstrap
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
cd ..
git clone https://github.com/snort3/snort3.git
cd snort3
```

Générer les fichiers de configuration :

```bash
./configure_cmake.sh
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
cd /usr/local/snort/bin
./snort -V
```

Après avoir suivi ces étapes, Snort3 devrait être entièrement installé avec toutes ses dépendances et utilitaires. Vous pouvez maintenant configurer Snort selon vos besoins en matière de sécurité réseau.
