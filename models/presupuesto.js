var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    proveedor: String, // en mongoose la inicial se escribe en mayúscula
    cif: String,
    fecha: String,
    concepto: String,
    base: Number,
    tipo: Number,
    irpf: String,
    retencion: Boolean,
    importe: String, // ponemos string porque es un tipado de datos no una validación
    total: String,
})

PresupuestoSchema.plugin(unique, {message: 'El cif introducido ya existe'});

//para exportarlo - Presupuesto en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Presupuesto', PresupuestoSchema);