# *CONFIGURATION OSPF & BGP*

##### Router Bordure

````
R32# router bgp 300
R32# neighbor 192.168.42.1 remote-as 100
R32# neighbor 192.168.43.2 remote-as 200
R32# network 192.168.32.0
R32# network  192.168.38.0
R32# network 192.168.35.0 

R32# router ospf 1
R32# router-id 9.9.9.9
R32# redistribute bgp 300 match internal external
````

![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Screenshots/bgp1.png)

##### Router pas bordure

````
R31# router ospf 1
R31# router-id 10.10.10.10
R31# network 192.168.31.0 0.0.0.255 area 0
R31# network 192.168.38.0 0.0.0.255 area 0
R31# network 192.168.36.0 0.0.0.255 area 0

R31# router bgp 300
R31# redistribute ospf 1 match internal external
````
![alt tag](https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Screenshots/bgp2.png)


Notion OSPF : https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Notions%20/OSPF%20/OSPF.md
Notion BGP : https://github.com/NicolasW-7/AIS-Brief-et-TIPS/blob/main/R%C3%A9seau/Notions%20/BGP/BGP.md
