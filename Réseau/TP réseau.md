# ***Réalisation d'un TP réseau via Packet Tracer***

Ce Tp sert de base pour récapituler les commandes ainsi que les aspects du réseau dans sa grande globalité.

## *Plan de l'infrastructure PCT*

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Screenshots/INFRA.png)

Voici le découpage selon le modèle OSI de notre infra réseau ainsi que ce que nous verrons dans ce dossier "réseau"

### Plans de déploiement 

#### 1. Configuration initiale :

        - Hostname
        - Bannière
        - Accès Console
        - Accès SSH

#### 2. Niveau 2 / Liaison :

        - Etherchannel (LACP)
        - Vlans
                - Création des Vlans
                - Assignation des Vlans
                - Trunks
                - Vlan management / admin
                - Voice VLAN
        - STP

#### 3. Niveau 3 / Réseau :

        - Configuration IP statique sur les endpoints 
        - Interfaces routeurs
        - Interface SVI (switch virtual interface)
        Routage inter VLAN

        WAN 
        * Routage (routes par défaut)
        * OSPF
        * PAT
        * DNAT

#### 4. Niveau 7 / Applications :

        - DHCP
                *Relais DHCP
                * Activation configuration dynamique
        - TOIP
        - HTTPS
        - TFP

#### 5. Sécurité :

        - Sécurité des interfaces

