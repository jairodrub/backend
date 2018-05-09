var express = require ('express');
var mongoose = require ('mongoose');

var Presupuesto = require('../models/presupuesto.js');

var app = express();

// Peticion GET

app.get('/', (req, res, next) =>{
    Presupuesto.find({}).exec((err, presupuestos)=>{ //find con solo las llaves busca todas las presupuestos. //.exec() es para que se ejecute
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        })
    });   
});

app.get('/cliente', (req, res, next) =>{

    Presupuesto.aggregate([{$group:{_id:{cliente:"$cliente"},total:{$sum:"$total"}}}]).exec((err, datos)=>{
        if(err){ //este if es en caso de que tenga errores
            return res.status(500).json({
                ok: false,                       
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok:true,
            datos:datos
        })
    });
});

// Peticion POST

app.post('/', (req, res)=>{

    var body = req.body;

    var presupuesto = new Presupuesto({
        cliente: body.cliente,
        cif: body.cif,
        fecha: body.fecha,
        items: body.items,
        suma: body.suma,
        tipo: body.tipo,
        iva: body.iva,
        total: body.total,
    })

    presupuesto.save((err, presupuestoGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la presupuesto',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            presupuesto: presupuestoGuardado
        })
    });

});

//Petición PUT

app.put('/:id', function(req, res, next){  
    //findByIdAndUpdate --> busca un documento con su id y lo modifica
    Presupuesto.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Presupuesto actualizada'
        });
    });

});

// Peticion DELETE

app.delete('/:id', function(req, res, error){
    //findByIdAndRemove --> busca un documento con su id y lo elimina
    Presupuesto.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Presupuesto' + datos.proveedor + 'eliminado'; // para ver el proveedor del eliminado
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })

})

module.exports = app;