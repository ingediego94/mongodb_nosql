const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// conexion     
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a Mongo'))
.catch(err => console.error('Error en la conexion', err));


// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto 3000`);
    
})