var mongoose = require('mongoose');

var SesionSchema = new mongoose.Schema({
    nombre: String,
    login: Date,
    logout: Date,
    duracion: String
})

//para exportarlo - Sesion en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Sesion', SesionSchema);