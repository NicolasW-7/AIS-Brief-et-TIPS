# ***Configuration initiale***

````
        enable
        conf t
        hostname 
        banner motd '!!! AUTHORIZED ACCES ONLY !!!'
        line console 0
                password xxx
                login xxx
                exit
        enable secret root
        service password-encryption

        username xxx password xxx
        ip domain-name xxx

        crypto key generate RSA
                2048
        ip ssh version 2
        line vty 0 15
                transport input ssh
                login local
                exit
        do wr
````
