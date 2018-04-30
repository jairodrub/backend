var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: {type: String, unique: true},
    password: String,
    rol: String // Para un modelo de autorizaciones
})

UsuarioSchema.plugin(unique, {message: 'El mail introducido ya se encuentra en uso'});

//para exportarlo - Usuario en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Usuario', UsuarioSchema);