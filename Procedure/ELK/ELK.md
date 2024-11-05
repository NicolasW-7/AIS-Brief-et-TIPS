# Déployer la Suite ELK (Elasticsearch, Logstash, Kibana) avec Docker Compose

Ce guide s'adresse aux utilisateurs souhaitant déployer une stack ELK complète en utilisant Docker Compose. Chaque composant sera configuré pour interagir facilement avec les autres et centraliser les logs sur un seul serveur.

---

## Prérequis

- **Docker** et **Docker Compose** doivent être installés sur le système. Vous pouvez vérifier leur installation en utilisant les commandes suivantes :

    ```bash
    docker --version
    docker-compose --version
    ```

    Si Docker et Docker Compose ne sont pas encore installés:

# Installation de Docker

## Configurer le dépôt Docker

Source : [Documentation GitHub](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/Procedure/Docker/Installation%20Docker.md?plain=1)

1. **Mettre à jour la liste des paquets :**

    ```bash
    sudo apt-get update
    ```

2. **Installer les paquets nécessaires :**

    ```bash
    sudo apt-get install ca-certificates curl gnupg
    ```

3. **Créer le répertoire pour les clés du dépôt :**

    ```bash
    sudo install -m 0755 -d /etc/apt/keyrings
    ```

4. **Télécharger et ajouter la clé GPG de Docker :**

    ```bash
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```

5. **Changer les permissions de la clé GPG :**

    ```bash
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    ```

6. **Ajouter le dépôt Docker à la liste des sources APT :**

    ```bash
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

7. **Mettre à jour la liste des paquets pour inclure le dépôt Docker :**

    ```bash
    sudo apt-get update
    ```

8. **Installer les paquets Docker nécessaires :**

    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

## Vérifier l'installation de Docker

1. **Vérifier l'état du service Docker :**

    ```bash
    systemctl status docker
    ```

    Si Docker est "actif (en cours d'exécution)", activez le service Docker pour qu'il démarre automatiquement après le redémarrage de la machine :

    ```bash
    sudo systemctl enable docker
    ```

## Prélude

Création du fichier elk-stack

  ```bash
    mkdir elk-stack
    cd elk-stack
  ```
---

## Étape 1 : Créer un fichier `docker-compose.yml`

Le fichier `docker-compose.yml` sera utilisé pour définir les services Docker et leurs configurations.

1. **Dans le répertoire `elk-stack`, créez le fichier `docker-compose.yml` :**

    ```bash
    nano docker-compose.yml
    ```

2. **Ajoutez le contenu suivant au fichier :**

    ```yaml
    version: '3.7'
    services:
      elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
        container_name: elasticsearch
        environment:
          - discovery.type=single-node # Permet d'exécuter un seul nœud Elasticsearch
          - ES_JAVA_OPTS=-Xms512m -Xmx512m # Limite la mémoire utilisée par Java pour Elasticsearch
        ports:
          - "9200:9200" # Expose le port 9200 pour qu'Elasticsearch soit accessible
        volumes:
          - es_data:/usr/share/elasticsearch/data # Volume persistant pour les données

      logstash:
        image: docker.elastic.co/logstash/logstash:8.0.0
        container_name: logstash
        ports:
          - "5044:5044" # Port pour recevoir des logs de Filebeat
          - "5000:5000" # Port pour recevoir des logs TCP
        volumes:
          - ./logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf # Configuration personnalisée de Logstash

      kibana:
        image: docker.elastic.co/kibana/kibana:8.0.0
        container_name: kibana
        environment:
          - ELASTICSEARCH_HOSTS=http://elasticsearch:9200 # URL pour se connecter à Elasticsearch
        ports:
          - "5601:5601" # Expose Kibana sur le port 5601

    volumes:
      es_data:
        driver: local # Type de volume pour persister les données Elasticsearch
    ```

---

## Étape 2 : Créer la configuration de Logstash

Logstash nécessite un fichier de configuration pour définir les règles d'entrée, de filtrage, et de sortie.

1. **Créer un dossier `logstash` dans le répertoire `elk-stack` :**

    ```bash
    mkdir logstash
    ```

2. **Créer le fichier de configuration `logstash.conf`** dans le dossier `logstash` :

    ```bash
    nano logstash/logstash.conf
    ```

3. **Ajoutez le contenu suivant au fichier `logstash.conf` :**

    ```plaintext
    input {
      beats {
        port => 5044 # Port pour recevoir les logs envoyés par Filebeat
      }
    }

    filter {
      grok {
        match => { "message" => "%{COMBINEDAPACHELOG}" } # Filtre pour les logs de type Apache
      }
      date {
        match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
        remove_field => [ "timestamp" ]
      }
    }

    output {
      elasticsearch {
        hosts => ["http://elasticsearch:9200"]
        index => "logstash-%{+YYYY.MM.dd}" # Les logs sont envoyés à un index journalier
      }
      stdout { codec => rubydebug } # Permet d'afficher les logs traités dans la console
    }
    ```

---

## Étape 3 : Démarrer les services avec Docker Compose

Dans le répertoire `elk-stack`, lancez la commande suivante pour démarrer les conteneurs en arrière-plan :

```bash
docker-compose up -d
```

Vérifiez que les conteneurs sont en cours d'exécution :

```bash
docker-compose ps
```

## Étape 4 : Vérifier le bon fonctionnement des services
Vérifiez Elasticsearch : Accédez à http://localhost:9200 depuis un navigateur ou utilisez curl :

```bash
Copier le code
curl -X GET "localhost:9200/"
```

Vérifiez Kibana : Accédez à http://localhost:5601 dans votre navigateur.

Tester Logstash : Vous pouvez envoyer un message de test à Logstash pour vérifier qu'il le traite correctement.

```bash
echo "127.0.0.1 - - [05/Nov/2024:11:11:11 +0000] \"GET / HTTP/1.1\" 200 2326" | nc localhost 5000
```

## Étape 5 : Utiliser Kibana pour visualiser les données

Connectez-vous à Kibana et allez dans Management > Stack Management > Index Patterns.

Créez un Index Pattern pour les logs envoyés par Logstash en utilisant logstash-*.

### Explorer les données :
Utilisez l’onglet Discover pour voir les logs traités.
Créez des visualisations dans Visualize et assemblez-les dans un Dashboard pour visualiser les logs en temps réel.
