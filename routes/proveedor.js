var express = require ('express');
var mongoose = require ('mongoose');

var Proveedor = require('../models/proveedor.js');

var app = express();

// Peticion GET

app.get('/', (reg, res, next) =>{
    Proveedor.find({}).exec((err, proveedores)=>{ //find con solo las llaves busca todos los proveedores. //.exec() es para que se ejecute
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedores: proveedores
        })
    });   
})

app.get('/:id', function(req, res, next){
    Proveedor.findById(req.params.id, (err, proveedor)=> {
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err // err error
            })
        }
        res.status(200).json({ // res respuesta
            ok: true,
            proveedor: proveedor
        })
    })
})

// Peticion POST

app.post('/', (req, res)=>{

    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto,
    })

    proveedor.save((err, proveedorGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el proveedor',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            proveedor: proveedorGuardado
        })
    });

});

//peticion put

app.put('/:id', function(req, res, next){  
    //findByIdAndUpdate --> busca un documento con su id y lo modifica
    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Proveedor actualizado'
        });
    });

});

// peticion delete

app.delete('/:id', function(req, res, error){
    //findByIdAndRemove --> busca un documento con su id y lo elimina
    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Proveedor' + datos.nombre + 'eliminado'; // para ver el nombre del eliminado
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })

})

module.exports = app;