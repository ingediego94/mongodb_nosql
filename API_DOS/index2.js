const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const productos = require('./models/productos');     // Establecemos el endpoint
const app = express();
app.use(express.json());

// Conexion a la BD con async/await
async function conectarDB(){

        try{

            await mongoose.connect(process.env.MONGO_URL2);
            console.log('Conectado a MONGO productos');

        } catch(error){

            console.error("Error en la conexion", error);

        }

}

// Llamamos a la funcion para conectarse:
conectarDB();

// Establecemos el puerto.
const PORT = process.env.PORT || 3000;      //Está leyendo una variable de entorno llamada PORT, si esa variable no esta definida en .env entonces toma por defecto 3000
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo por el puerto ${PORT}`);
});


// Metodo POST
app.post('/productos', async(req, res) => {
    try {
        const nuevoProducto = new productos(req.body);
        const productoGuardado = nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error){
        res.status(400).json({error: "Error al guardar el producto."})
    }
});



// Metodo GET
app.get('/productos', async(req, res) =>{
    try{
        
        const obtenerProductos = await productos.find();
        res.json(obtenerProductos);

    } catch(error){

        res.status(500).json({error: 'Error al recuperar los productos.'});

    }
});



// Metodo PUT
app.put('/productos/:id', async(req, res)=>{

    try{
        
        const productoActualizado = await productos.findByIdAndUpdate(
            req.params.id, {
                nombre_prod: req.body.nombre_prod,
                precio: req.body.precio,
                status: req.body.status
            },
            {new: true}
        );

        if(!productoActualizado) {
            return res.status(404).json({error: 'Producto no encontrado'});
        }

        res.json(productoActualizado);

    } catch(error){
        res.status(400).json({error: 'Error al actualizar el cliente,', detalles:error})
    }

});



// Metodo DELETE
app.delete('/productos/:id', async (req, res) =>{
    try{

        const productoEliminado = await productos.findByIdAndDelete(req.params.id);

        if(!productoEliminado) {
            return res.status(404).json({error: 'Producto no encontrado.'})
        }

        res.json({mensaje: 'Producto eliminado correctamente', producto: productoEliminado});

    } catch(error){
        res.status(400).json({error: 'Error al eliminar el producto', detalles: error});
    }
});