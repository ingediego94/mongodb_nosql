const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const clientes = require('./models/clientes')
const app = express();
app.use(express.json());

// conexion     
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Conectado a Mongo'))
.catch(err => console.error('Error en la conexion', err));


// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto 3000`);
    
});



// Endpoint encargado de insertar un nuevo cliente.
app.post('/clientes', async(req, res) => {
    try {
        const nuevoCliente = new clientes(req.body);
        const clienteGuardado = nuevoCliente.save();
        res.status(201).json(clienteGuardado);
    } catch (error){
        res.status(400).json({err: "Error al guardar el cliente"});
    }
    
});

// Metodo get
app.get('/clientes', async (req, res) => {
    try{
        const obtenerClientes = await clientes.find();
        res.json(obtenerClientes);
    } catch(error){
        res.status(500).json({error: 'Error al recuperar'});
    }
});


//Metodo put por ID
app.put('/clientes/:id', async(req, res) => {
    try{
        const clienteActualizado = await clientes.findByIdAndUpdate(
            req.params.id, {
                nombre: req.body.nombre,
                edad: req.body.edad, 
                direccion: req.body.direccion
            },
            { new: true}
        );

        if(!clienteActualizado) {
            return res.status(404).json({error: 'Cliente no encontrado'});
        }

        res.json(clienteActualizado);

    } catch(error){
        res.status(400).json({error: 'Error al actualizar el cliente.', detalles:error})    // modifique esta
    }
});



// Metodo delete por ID
app.delete('/clientes/:id', async (req, res) => {
    try {
        const clienteEliminado = await clientes.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado correctamente', cliente: clienteEliminado });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el cliente', detalles: error });
    }
});



