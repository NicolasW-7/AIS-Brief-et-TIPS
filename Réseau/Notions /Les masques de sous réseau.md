# Tableau des Masques de Sous-Réseau

Ce tableau présente les informations essentielles pour différentes tailles de sous-réseaux, y compris le masque de sous-réseau, le nombre d'adresses IP disponibles et les plages d'adresses utilisables.

| CIDR       | Masque de Sous-Réseau  | Nombre Total d'Adresses | Adresses Utilisables | Description                    |
|------------|------------------------|-------------------------|----------------------|--------------------------------|
| /30        | 255.255.255.252        | 4                       | 2                    |  Utilisé pour les liens point-à-point dans les réseaux WAN |
| /29        | 255.255.255.248        | 8                       | 6                    | |
| /28        | 255.255.255.240        | 16                      | 14                   | |
| /27        | 255.255.255.224        | 32                      | 30                   | |
| /26        | 255.255.255.192        | 64                      | 62                   | |
| /25        | 255.255.255.128        | 128                     | 126                  | |
| /24        | 255.255.255.0          | 256                     | 254                  | Réseau standard de classe C, utilisé souvent dans les LANs |
| /23        | 255.255.254.0          | 512                     | 510                  | |
| /22        | 255.255.252.0          | 1024                    | 1022                 | |
| /21        | 255.255.248.0          | 2048                    | 2046                 | |
| /20        | 255.255.240.0          | 4096                    | 4094                 | |
| /19        | 255.255.224.0          | 8192                    | 8190                 | |
| /18        | 255.255.192.0          | 16384                   | 16382                | |
| /17        | 255.255.128.0          | 32768                   | 32766                | |
| /16        | 255.255.0.0            | 65536                   | 65534                | |
| /15        | 255.254.0.0            | 131072                  | 131070               | |
| /14        | 255.252.0.0            | 262144                  | 262142               | |
| /13        | 255.248.0.0            | 524288                  | 524286               | |
| /12        | 255.240.0.0            | 1048576                 | 1048574              | |
| /11        | 255.224.0.0            | 2097152                 | 2097150              | |
| /10        | 255.192.0.0            | 4194304                 | 4194302              | |
| /9         | 255.128.0.0            | 8388608                 | 8388606              | |
| /8         | 255.0.0.0              | 16777216                | 16777214             | |

## Notes

- Le nombre total d'adresses inclut l'adresse de réseau et l'adresse de broadcast.
- Les adresses utilisables excluent l'adresse de réseau et l'adresse de broadcast.

