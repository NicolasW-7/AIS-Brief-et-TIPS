# Rapport de défense

## Fichier Rules

Ceci est le fichier test.rules proposer par la communauté de snort avec quelque regles en plus nous concernant

```bash
alert tcp any any -> any 22 (msg:"Tentative de connexion SSH"; sid:1000002; rev:1;)
alert tcp any any -> any any (flags:S; msg:"TCP Scan detected"; sid:1000003; rev:1;)
alert tcp any any -> any 80 (msg:"Possible DoS attack"; flags:PA; content:"GET / HTTP/1.1"; flow:to_server,established;>alert tcp any any -> any 4444 (msg:"Reverse Shell Attempt"; flow:to_server,established; content:"|2f 62 69 6e 2f 62 61 >
```
## Statistique des règles

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/RulesCount.png)

## Screenshot des potentielles attaques

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/ICMP.png)

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/ICMP2.png)

## Bloquer tout le trafic ICMP entrant
sudo iptables -A INPUT -p icmp --icmp-type all -j DROP

## Accepter les connexions SSH existantes
sudo iptables -A INPUT -p tcp --dport 22 -m state --state ESTABLISHED,RELATED -j ACCEPT

## Limiter les nouvelles connexions SSH : 5 tentatives en 60 secondes
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 5 -j REJECT

# Rapport d'attaque

## scan Nmap

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/NMAPort.png)

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/NMAPA.png)

## attaque ssh avec dictionnaire 

### Mot de passe trouver

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/SSHOK.png)

### Connexion a la machine cible

![alt tag](https://github.com/Zennael/AIS/blob/main/Rendu/Screenshot/SSHOK2.png)
