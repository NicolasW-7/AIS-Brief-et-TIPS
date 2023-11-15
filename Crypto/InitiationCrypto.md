# ***Introduction à la cryptographie***

### 1. Générer et partager une clé de chiffrement AES256 ainsi que les IV avec le destinataire 

Clé = $aes 54 255 244 56 40 221 51 119 93 133 48 173 193 160 50 229 206 226 28 101 173 237 227 217 150 254 182 16 101 122 40 201

IV = $iv 15 253 253 17 62 164 120 152 74 170 58 60 68 116 130 47

### 2. Comment générer une clé de chiffrement de manière sure ? Quel est le risque si les IV sont toujours les mêmes ? 

La ligne du script disponible sur Dojo 101 : [Security.Cryptography.RNGCryptoServiceProvider] 
Permet une clé de chiffrement aléatoire qui contibue a générer une clé sûre

Si les IV sont identiques, le risque et que si l’attaquant intercepte et déchiffre les IVs, cela lui permettra de décrypter les messages ou de déchiffrer les informations. 



### 3. Chiffrer un message et l’envoyer 

Avec les IVs et la clé précédente le message suivant : 

D88F0C3DA8C43F8B457D665D7FACD8E1B75FEDDD3DA3A799435F7E97B739D182EE73A97AA26ED835DA9D8DD231DBC3A7383B7A74C0D3E28F7D952DCBB8807BC0DBEE36787A32B3CA388D0ED83B4A7B043FDDD6BE7A4C63A781AE1E04620BF659B58BB5DD30495E18AEEE6EA723513CE45BF4193E60B1FA92CA18B2B57523FF780A8E501C549FBE89A23B507DB6EA44CD9EAAE9B714B8A89C7CC6995C57F405B0B07374FA5FECFA5700FBA0338EC9CEAADA09A74970F8CE808A556CD75B3C572F1447BE4B0F7A6D78B9DD3EFE2785A7B40A7891646F4FEE696EA334103468A3A68B71F033CD451496F5A7A82B2CF33F42CCF486B21FA3BC005FE711C2CD30EC88


### 4. Recevoir et déchiffrer le message 

C822DAA500808D8603C6F5EF411D73036851B54CF90468BDF989DC3D0E7285E4

Le message de benjamin avec les IVs et la clé : Le saucisson c’est bon …




### 5. Comment pourrait-on s'assurer de l'intégrité du message et de l'authenticité du destinataire ? Ajouter cette fonctionnalité à l'aide d'un script ou d'un outil en CLI. 

J’utilise des clés de chiffrement asymétrique et un calcul de hash  

### script de cryptage en python

````python
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
import hashlib

# génère la paire de clés
def generer_cle_asymetrique():
    private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048, backend=default_backend())
    return private_key, private_key.public_key()

# encrypt le message
def chiffre(message, public_key):
    return public_key.encrypt(message.encode(), padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()), algorithm=hashes.SHA256(), label=None))

message_original = input("Entrez votre message : ")
private_key, public_key = generer_cle_asymetrique()
message_chiffre = chiffre(message_original, public_key)

# écris tout dans les fichiers
with open("cle_publique.pem", "w") as f:
    f.write(public_key.public_bytes(encoding=serialization.Encoding.PEM, format=serialization.PublicFormat.SubjectPublicKeyInfo).decode())
with open("cle_privee.pem", "w") as f:
    f.write(private_key.private_bytes(encoding=serialization.Encoding.PEM, format=serialization.PrivateFormat.TraditionalOpenSSL, encryption_algorithm=serialization.NoEncryption()).decode())
with open("message_chiffre.bin", "wb") as f:
    f.write(chiffre(message_original, public_key))

# Affiche les infos
print("Clé publique enregistrée dans 'cle_publique.pem'")
print("Clé privée enregistrée dans 'cle_privee.pem'")
print("Message chiffré enregistré dans 'message_chiffre.bin'")
print("Message chiffré:", message_chiffre.hex())

# Calcule le hash est l'enregistre dans un fichier
try:
    with open('message_chiffre.bin', 'rb') as file:
        hash_value = hashlib.sha256(file.read()).hexdigest()
        print(f"La signature est : {hash_value}")
        with open('hash.txt', 'w') as hash_file:
            hash_file.write(hash_value)
            print(f"Le hachage a été enregistré dans hash.txt")
except FileNotFoundError:
    print(f"Fichier hash.txt introuvable.")
except Exception as e:
    print(f"Erreur lors du calcul du hachage : {e}")

input("Appuyez sur Entrée pour quitter...")

````

### Script de decryptage en python

````python
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
import hashlib

# Calcul du hash
def calculer_hash_fichier(file_path):
    try:
        with open(file_path, 'rb') as file:
            file_data = file.read()
            hash_value = hashlib.sha256(file_data).hexdigest()
            return hash_value
    except FileNotFoundError:
        print(f"Fichier hash.txt introuvable.")
    except Exception as e:
        print(f"Erreur lors du calcul du hachage : {e}")
    return None

# Écriture du hash dans hashVerif.txt
if calculer_hash_fichier('message_chiffre.bin'):
    with open('hashVerif.txt', 'w') as hashD_file:
        hashD_file.write(calculer_hash_fichier('message_chiffre.bin'))

# Comparaison des hash
try:
    with open('hash.txt', 'r') as hash_file, open('hashVerif.txt', 'r') as hashD_file:
        if hash_file.read().strip() == hashD_file.read().strip():
            print("L'intégrité du message a été vérifiée.")
        else:
            print("Attention, le message a été modifié.")
except FileNotFoundError:
    print("Au moins l'un des fichiers est introuvable.")
except Exception as e:
    print(f"Une erreur est survenue lors de la comparaison des fichiers : {e}")
            
input("Appuyez sur Entrée pour continuer...")

def dechiffre(ciphertext, private_key):
    plaintext = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None))
    return plaintext.decode()

with open("cle_privee.pem", "rb") as f:
    private_key = serialization.load_pem_private_key(
        f.read(),
        password=None,
        backend=default_backend())

with open("message_chiffre.bin", "rb") as f:
    message_chiffre = f.read()

print("Message déchiffré:", dechiffre(message_chiffre, private_key))

input("Appuyez sur Entrée pour quitter...")
````

Un petit rendu des scripts:

![alt tag](https://github.com/Zennael/AIS/blob/main/Cryptographie/screenshot/Aspose.Words.cfe49b3c-5329-4db8-b9eb-d08292603854.005.jpeg)

### 6. Reprendre la question 4 avec un algorithme post quantique

````python

import pyspx.shake_128f as sphincs
import os

# Génération de clés : clé privée + clé publique
seed = os.urandom(sphincs.crypto_sign_SEEDBYTES)
public_key, secret_key = sphincs.generate_keypair(seed)

# Signature du message et vérification de la signature
message = b"Tony mon ami pour la vie"
signature = sphincs.sign(message, secret_key)
valid = sphincs.verify(message, signature, public_key)

print("Message:", message)
print("Signature valide?", valid)

# Vérification d'un message modifié + signature
message_modifie = b"Tony mon ami pour la vie"
valid_modifie = sphincs.verify(message_modifie, signature, public_key)

print("Message modifié:", message_modifie)
print("Signature valide pour le message modifié?", valid_modifie)


````
   
### 7. le message suivant a été intercepté : 

"prggr grpuavdhr f'nccryyr yr puvsserzrag qr prnfre, vy a'rfg cyhf hgvyvft nhwbheq'uhv, pne crh ftphevft" 

"cette technique s'appelle le chiffrement de caesar, il n'est plus utilisé aujourd'hui, car peu sécurisé" 

