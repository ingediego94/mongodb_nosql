// Importa la biblioteca mongoose, que se usa para modelar objetos MongoDB en Node.js.
const mongoose = require('mongoose');

// Definimos un schema llamado producto.
// Un esquema es una especie de plantilla que define la estructura de los documentos dentro de una colección de MongoDB.
const cliente = new mongoose.Schema({
    nombre: String,
    edad: Number,
    direccion: String,
});


// Crea un modelo llamado 'cliente' (el nombre de la colección será pluralizado automáticamente por Mongoose como clientes).
// El modelo usa el esquema definido previamente.
// module.exports lo exporta para que puedas usarlo en otros archivos
module.exports = mongoose.model('cliente', cliente)