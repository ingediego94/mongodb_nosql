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
