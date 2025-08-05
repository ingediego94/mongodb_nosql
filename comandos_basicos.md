## Comandos básicos en Mongo DB

- Limpiar la consola:

        cls

- Ver todas las bases de datos:

        show databases

        show dbs
    
    Nota: solo se verán solo aquellas que tienen al menos un documento insertado.

- Crear una base de datos:

        use nombre_de_la_bd

        use mi_tienda

- Crear una nueva coleccion (similar a una tabla sql):

        db.createCollection("nombreColeccion")


- Ver las colecciones que tiene una bd.

        show collections


- Cambiar de una coleccion a otra?
Imaginemos que tenemos 3 colecciones:
productos, usuarios, clientes
lo que debo hacer para cambiar entre una coleccion y otra es solo colocar el nombre de esta luego del: db.coleccionDeseada

        db.productos


- Insertar nuevos registros:

    - Un solo registro:

            b.clientes.insertOne(
                {nombre:"Maria", genero:"F", edad:42, hobbies:["caminar", "otros"]}
            )

    - Varios registros a la vez:

            b.clientes.insertMany([
                {nombre:"Sofia", genero:"F", edad:22, hobbies:["gym", "correr"]},
                {nombre:"Ana", genero:"F", edad:34, hobbies:["trecking", "otro"]},
                {nombre:"Felipe", genero:"M", edad:18, hobbies:["calistenia", "comer"]}
            ])


- Ver todos los registros de la bd:

        db.clientes.find()


- Buscar un registro en específico:

        db.clientes.find({nombre:"Diego"})


- Modificar / actualizar un registro:

        db.coleccion.updateOne(
            { campo_busqueda: valor },       // Filtro
            { $set: { campo_actualizar: nuevo_valor } }  // Cambios
        )


        db.coleccion.updateOne(
            { campo_busqueda: valor },       // Filtro
            { $set: { campo_actualizar: nuevo_valor } }  // Cambios
        )


- Modificar actualizar varios registros:

        db.coleccion.updateMany(
            { filtro },          // Qué documentos quieres actualizar
            { $set: { campo: nuevo_valor } }  // Qué cambios aplicar
        )

        
        // A todos los registros con edad=13, se le cambiará a edad:31

        db.clientes.updateMany(
            {edad: 13},
            {$set: {edad:31}}
        )


        // A todos los registros con edad=13 se le añadira el campo validado:ok

        db.clientes.updateMany(
            {edad: 13},
            {$set: {validado: 'ok'}}
        )


        // A los nombres de 'Miguel' y 'Marta', se les anadira el campo 'status: true'
        
        db.clientes.updateMany(
            {nombre: {$in: ['Miguel', 'Marta']}},
            {$set: {status: true}}
        )




- Agregar mas campos a un registro:

        db.nombre_coleccion.updateOne(
            { filtro },
            { $set: { nuevo_campo: valor, otro_campo: otro_valor } }
        )


        db.clientes.updateOne(
            {nombre: 'Felipe'},
            {$set:{email: 'pipe@gmail.com', status:true}}
        )


        db.clientes.updateOne(
            {nombre: 'Diego'},
            {$set:{estudios: [
                {escuela: "primaria de Springfield"},
                {bachiller:"Chatterhouse"},
                {universidad: [
                    {pregrado_1: "geografo"},
                    {pregrado_2: "ingenieria de software"}
                ]},
                {posgrado: "MsC in Big Data & Business Intelligence"}
            ]}}
        )


- Borrar un solo registro:

        db.clientes.deleteOne({nombre: "Ana"})


- Borrar varios registros:



- Borrar todos los registros:

        db.clientes.deleteMany({})


- Borrar registros con varios filtros o condiciones:

        db.nombre_coleccion.deleteMany({
        $and: [
            { campo1: valor1 },
            { campo2: valor2 },
            ...
            ]
        })



        db.nombre_coleccion.deleteMany({
            $or: [
                { campo1: valor1 },
                { campo2: valor2 }
            ]
        })


    - Ejemplo 1: eliminar todos los clientes con status: false Y edad menor a 18

            db.clientes.deleteMany({
                $and: [
                    { status: false },
                    { edad: { $lt: 18 } }
                ]
            })

    
    - Ejemplo 2: eliminar todos los clientes llamados "Laura" O "Miguel"
            
            db.clientes.deleteMany({
                nombre: { $in: ["Laura", "Miguel"] }
            })


    - Ejemplo 3: eliminar todos los documentos con email terminado en @correo.com y con status false
        ```
        db.clientes.deleteMany({
            $and: [
                { email: /@correo\.com$/ },
                { status: false }
            ]
        })
        ```


## CONSULTAS COMPLEJAS

## Comparadores

MongoDB permite usar varios operadores de comparación en las consultas. Algunos de los más comunes son: 

    - $eq: Igual a 

    - $ne: No igual a 

    - $gt: Mayor que 

    - $gte: Mayor o igual que 

    - $lt: Menor que 

    - $lte: Menor o igual que 

    - $in: Dentro de un conjunto de valores 

    - $nin: No está en un conjunto de valores 

Ejemplo: Buscar clientes cuyo precio de producto sea mayor a 50 

        db.clientes.find({
            "productos_comprados.precio": { $gt: 50}
        })


---

## Lógicos

Los operadores lógicos permiten combinar varias condiciones. Los más comunes son:

        - $and: Combina varias condiciones que deben cumplirse todas. 

        - $or: Combina varias condiciones, donde basta que se cumpla una. 

        - $nor: El opuesto de $or, todas las condiciones deben ser falsas. 

        - $not: Niega una condición.

Ejemplo: Buscar clientes edad > 18 y ciudad:'Medellin'

        db.clientes.find({
            $and: [
                {edad: {$gte: 18} },
                {ciudad: "Medellin"}
            ]
        })


Ejemplo: Buscar clientes que tengan edad menos de 25 O ciudad:'Boston'

        db.clientes.find({
            $or: [
                { edad: { $lt: 25 } },           // Menor a 25 
                { ciudad: "Boston" }             // O ciudad sea Boston 
            ]
        })



## ÍNDICES

Para crear un índice en un campo específico, puedes usar el comando createIndex(). Aquí tienes un ejemplo de cómo crear un índice en el campo "nombre" de la colección "clientes": 

        db.clientes.createIndex({
            nombre: 1
        })

    El 1 indica que el índice será en orden ascendente. Si deseas un índice en orden descendente, puedes usar -1: 

        db.clientes.createIndex({
            "nombre": -1
        })


### Uso de índices compuestos

Puedes crear índices compuestos que abarca más de un campo. Es útil cuando tus consultas filtran, ordenan o buscan documentos usando varios campos al mismo tiempo. 

Ejemplo: crear un índice compuesto sobre los campos nombre y email en orden ascendente: 

        db.clientes.createIndex({
            nombre: 1, email: 1
        })

    Esto creará un índice que combine ambos campos, lo que acelerará las consultas que involucren estos dos campos, por ejemplo: 

        db.clientes.find({
            nombre: "Ana", email: "ana@email.com"
        })

Ver todos los indices:

        db.clientes.getIndexes()

Eliminar un índice:

        db.clientes.dropIndex("nombre_1")

---

## AGREGACIONES

### Operadores de agregación mas comunes:

        - $match: Filtra documentos según condiciones específicas (similar a find). 

        - $group: Agrupa documentos según una clave y realiza cálculos, como sumas, promedios o conteos. 

        - $sort: Ordena los documentos en un orden ascendente o descendente. 

        - $project: Modifica la forma de los documentos, seleccionando o eliminando campos. 

        - $limit: Limita el número de documentos en los resultados. 

Ejemplo:
Obtener el total de productos comprados por cada cliente.

Imagina que quieres conocer cuáles productos se han vendido más en la ciudad de Medellín. Primero, usamos la etapa $match para filtrar únicamente las ventas realizadas en esa ciudad. Luego, agrupamos los documentos por producto con $group, sumando la cantidad vendida de cada uno. Finalmente, ordenamos los resultados de mayor a menor usando $sort para ver qué productos han tenido más demanda. 

        db.ventas.aggregate({
            { $match: {ciudad: "Medellin"} },
            { $group: {_id: "$producto", total: { $sum: "$cantidad" } } },
            { $sort: { total: -1} }
        })

    En este ejemplo: 

    - Filtra las ventas de Medellín. 

    - Agrupa por producto y suma las cantidades vendidas. 

    - Ordena los resultados de mayor a menor.


Ejemplo 2:
Promedio de precio de productos por cliente

Aquí calculamos el precio promedio de los productos comprados por cada cliente. 

        db.clientes.aggregate([
            {
                $unwind: "$productos_comprados"
            },
            {
                $group: {
                    _id: "$nombre",
                    promedio_precio: { $avg: "$productos_comprados.precio" }
                }
            }
        ])