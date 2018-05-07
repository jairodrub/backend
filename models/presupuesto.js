var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    cliente: String, // en mongoose la inicial se escribe en mayúscula
    fecha: String,
    items: Array,
    suma: String,
    tipo: Number,
    iva: Number,
    total: Number, // ponemos String porque es un tipado de datos no una validación
})

PresupuestoSchema.plugin(unique, {message: 'El cif introducido ya existe'});

//para exportarlo - Presupuesto en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);