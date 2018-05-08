var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/erp');
// connection porque nosotros lo llamamos así // mongoose es la var que tenemos arriba(línea 1)
autoIncrement.initialize(connection);

var PresupuestoSchema = new mongoose.Schema({
    cliente: String, // en mongoose la inicial se escribe en mayúscula
    cif: String,
    fecha: String,
    items: Array,
    suma: String,
    tipo: Number,
    iva: Number,
    total: Number, // ponemos String porque es un tipado de datos no una validación
})

// PresupuestoSchema.plugin(unique, {message: 'El cif introducido ya existe'});
PresupuestoSchema.plugin(autoIncrement.plugin, { model: 'Presupuesto', field: 'numero', startAt: 1})
// startAt para empezar por 1

//para exportarlo - Presupuesto en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);