Comando: "node index.js" para iniciar la app

Es necesario proveer las Llaves Privadas de Google y ... para utilizar sus servcios.
Se encuentras en el fichero: ./config/config.js

La app inicia en el puerto 3000

Login: POST /loing

El endpoint para inicio de sesión utiliza las siguientes credenciales:
{
    "user": "email@test.com",
    "password": "logysto.2021"
}

Georeferencia: GET /geo

El endpoitn recibe el parametro address en la URL

Ej: localhost:3000/geo?address=calle 20 10 10

