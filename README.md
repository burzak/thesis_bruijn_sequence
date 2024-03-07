# Cadenas de Bruijn algoritmo de Huang

# Como correrlo

Para correr esto solo hay que install node

```bash
npm install

# Para crear una cadena de Bruijn de orden 4 empezando desde 0000
npx ts-node bruijn.ts 0000

# Para que la salida sea verbose e imprima cada paso que da
npx ts-node bruijn.ts 0101 verbose


# Si queremos verificar que la cadena que nos devuelve es correcta
# debemos pasar la cadena como primer argumento y el orden de la cadena, en este caso 4
npx ts-node check_bruijn.ts 1000011110100101100 4
```