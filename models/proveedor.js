var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ProveedorSchema = new mongoose.Schema({
    nombre: String, // en mongoose la inicial se escribe en mayúscula
    cif: { type: String, unique: true }, // le estamos aplicando la validacion unique de mongoose-unique-validator
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String, // ponemos string porque es un tipado de datos no una validación
    contacto: String,
})

ProveedorSchema.plugin(unique, {message: 'El cif introducido ya existe'});

//para exportarl - Proveedor en este caso es el nombre con el que lo queremos exportar
module.exports = mongoose.model('Proveedor', ProveedorSchema);