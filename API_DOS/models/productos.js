// Importa la biblioteca mongoose, que se usa para modelar objetos MongoDB en Node.js.
const mongoose = require('mongoose');       

// Definimos un schema llamado producto.
// Un esquema es una especie de plantilla que define la estructura de los documentos dentro de una colección de MongoDB.
const producto = new mongoose.Schema({
    "nombre_prod": String,
    "precio": Number,
    "status": Boolean
});

// Exporta el modelo para que pueda ser usado en otras parte del codigo.
module.exports = mongoose.model('producto', producto);


