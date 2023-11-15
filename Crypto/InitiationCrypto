# ***Introduction à la cryptographie***

### 1. Générer et partager une clé de chiffrement AES256 ainsi que les IV avec le destinataire 

![alt tag](https://github.com/Zennael/AIS/blob/main/Cryptographie/screenshot/Aspose.Words.cfe49b3c-5329-4db8-b9eb-d08292603854.002.png)

### 2. Comment générer une clé de chiffrement de manière sure ? Quel est le risque si les IV sont toujours les mêmes ? 

Pour générer une clé de chiffrement sécurisée, il faut utilisez un générateur de nombres aléatoires cryptographiquement sûr, choisir une longueur de clé appropriée et la stockez de manière sécurisée. Les IV (Initialization Vectors) doivent être aléatoires et uniques pour chaque opération de chiffrement afin d'éviter les risques liés à la répétition des IV, ce qui pourrait compromettre la sécurité du chiffrement. 

### 3. Chiffrer un message et l’envoyer 

![alt tag](https://github.com/Zennael/AIS/blob/main/Cryptographie/screenshot/Aspose.Words.cfe49b3c-5329-4db8-b9eb-d08292603854.003.png)

### 4. Recevoir et déchiffrer le message 

![alt tag](https://github.com/Zennael/AIS/blob/main/Cryptographie/screenshot/Aspose.Words.cfe49b3c-5329-4db8-b9eb-d08292603854.004.png)

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

