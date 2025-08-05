Para correcto funcionamiento es necesario instalar:

        - npm init -y
        - npm install express
        - npm install express mongoose dotenv


Una vez ya listo cada metodo, probarlo en el postman con esta url:

        http://localhost:3000/clientes

    
- Para crear un nuevo registro, el postman debe estar en POST, en body = JSON, y manejar la misma estructura el del BD:

        {
            "nombre": "Juana de Arco",
            "edad": 31,
            "direccion": "París, Francia"
        }


- Para el obtener los datos de la BD, el postman debe estar en GET.

- Para Actualizar, el postman debe estar en PUT, en body = JSON, y manejar la misma estructura el del BD y usar el ID en el link:
        
        // El ultimo numero hexadecimal es el ID de mongodb:

        http://localhost:3000/clientes/6891331f773fceb88a88eca3       

        {
            "nombre": "Juana de Arco",
            "edad": 28,
            "direccion": "Tolouse, Francia"
        }

- Para eliminar un registro, tambien debemos tener el ID en la url. El postman debe estar en DELETE:

        http://localhost:3000/clientes/6891331f773fceb88a88eca3  

