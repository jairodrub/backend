var express = require ('express');
var mongoose = require ('mongoose');

var Factura = require('../models/factura.js');

var app = express();

// Peticion GET

app.get('/', (req, res, next) =>{
    Factura.find({}).exec((err, facturas)=>{ //find con solo las llaves busca todas las facturas. //.exec() es para que se ejecute
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            facturas: facturas
        })
    });   
});

app.get('/:id', function(req, res, next){
    Factura.findById(req.params.id, (err, factura)=>{
        if(err){ //este if es en caso de que tenga errores
            return res.status(500).json({
                ok: false,                       
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok:true,
            factura:factura
        })
    })
})

// Peticion POST

app.post('/', (req, res)=>{

    var body = req.body;

    var factura = new Factura({
        proveedor: body.proveedor,
        cif: body.cif,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        tipo: body.tipo,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total,
    })

    factura.save((err, facturaGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la factura',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            factura: facturaGuardado
        })
    });

});

//Petición PUT

app.put('/:id', function(req, res, next){  
    //findByIdAndUpdate --> busca un documento con su id y lo modifica
    Factura.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Factura actualizada'
        });
    });

});

// Peticion DELETE

app.delete('/:id', function(req, res, error){
    //findByIdAndRemove --> busca un documento con su id y lo elimina
    Factura.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Factura' + datos.proveedor + 'eliminado'; // para ver el proveedor del eliminado
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })

})

module.exports = app;