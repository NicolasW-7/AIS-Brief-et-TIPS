# **Partitions sous Linux**

## **Création d'une partition ext4 sous Linux**

On commence par éxecuter la commande : 

````
lsblk -a
````

Celle-ci liste les disques et partition et permet de voir la lettre de notre disque (sda,b,c). 

**Dans le cas d'un disque de plus de 2To on ne peux utiliser fdisk car celui-ci limite les partions à 2To, on utilisera parted**

Avant cela on va avoir besoin de quelques infos pour savoir à quel octet commencer l'écritures, sur le disques ou le raid cible, de manière la plus optimale possible. 

Avec la commande lsblk -a on a obetnu la lettre de notre disque on lance une série de commande *pour cette exemple ce sera sd()* :

````

    - cat /sys/block/sd()/queue/optimal_io_size
    - cat /sys/block/sd()/alignement_offset
    - cat /sys/block/sd()/queue/physical_block_size

```` 

*Pour chacune de ses lignes vous allez obentir une valeure*

On applique ensuite la formule : 

````
    (optimal_io_size - alignement_offset ) / physical_block_size = Chiffre de début d'écriture *(à retenir)*

````

On lance ensuite **parted** :

    ````
    parted
    -> print devices *(affiche les disques dans parted)*
    -> select /dev/sd()
    -> mklabel gpt
    -> mkpart "nommer"
    -> types de fichier : ext4
    -> dans "start" le résultat *(à retenir)*
    -> "end" = 100%
    -> Voir la partition "print partitions"
    
    *Vérifier que la partitions est bien alignée (il est possible que non ce n'est pas grave)*
    
    -> align_check optimal
    -> partition number :()
    -> set () lvm on
    -> print partitions
    -> quit
    ````

On peux relancer un lsblk -a on doit voir la partion en sd() -> sd()1 type part

## Monter la partition

On peut maintenant monter la partiton. 
Si ce n'est pas déjà fait créer le répertoire cible pour monter la partition. 
On utilise ensuite la commande 

````
    mkfs.ext4 /dev/sd()
````

*Selon le type de partiton changer .ext4*

On à créer notre partition logique on peux la monter dans notre répertoire :

````
    mount /dev/sd() /*répertoire*/*cyble*/
````

## **Inscription dans le fstab**

Pour rendre cette partition visible à chaque lancement de la machine ou rédémarrage on doit la mettre dans le fichier fstab

Avant cela  on entre 
````
blkid
````
*Avec la source de notre disque sd() on trouvera l'UUID 'identifiant unique' de notre disque.* 


On entre ensuite (avec une session root ou en ajoutant "su'): 

````
    nano /etc/fstab
ou

    vi /etc/fstab
````

Dans le fichier on ajoute à la suite des disques existant : 

UUID= "UUID de sd()" /media/storage ext4 defaults 0 0 

*pour notre exemple à adapter selon partition souhaitée.*

**Important : suivre le modèle existant dans la mise en forme du fichier**

Pour vérifier la configuration du fstab on peux faire 

````
    -> cd /
    -> unmont /dev/sd()
    -> mount -a
    -> cd /dev/sd()
    -> ls -l
````

"Sans erreur le fichier fstab est OK." 

Glossaire disponible :

UUID
fstab
Les différentes formats de partitions linux: 
