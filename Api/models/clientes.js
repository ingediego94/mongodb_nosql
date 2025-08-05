const mongoose = require('mongoose');

const cliente = new mongoose.Schema({
    nombre: String,
    edad: Number,
    direccion: String,
});

module.exports = mongoose.model('cliente', cliente)