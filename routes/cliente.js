var express = require ('express');
var mongoose = require ('mongoose');

var Cliente = require('../models/cliente.js');

var app = express();

// Peticion GET

app.get('/',(req, res, next) => {
    Cliente.find({}).exec((err, clientes)=>{
        if(err){ //este if es en caso de que tenga errores
            return res.status(500).json({
                ok: false,                       
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok:true,
            clientes:clientes
        })
    });
})

app.get('/nombre/:nombre', (req, res, next) =>{

    var nombre = req.params.nombre;

    Cliente.find({nombre:{$regex:nombre,$options:'i'}}).exec((err, clientes)=>{ 
        // $regex crea un objeto 'expresión regular' para encontrar texto de acuerdo a un patrón.
        //find con solo las llaves busca todos los clientes. 
        //.exec() es para que se ejecute // Ambas son como si escribiéramos en mongoDB
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });   
});

app.get('/localidad/:localidad', (req, res, next) =>{

    var localidad = req.params.localidad;

    Cliente.find({localidad:{$regex:localidad,$options:'i'}}).exec((err, clientes)=>{ 
        // $regex crea un objeto 'expresión regular' para encontrar texto de acuerdo a un patrón.
        //find con solo las llaves busca todos los clientes. 
        //.exec() es para que se ejecute // Ambas son como si escribiéramos en mongoDB
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });   
});

app.get('/mixto/:nombre/:localidad', (req, res, next) =>{
// Para decirle que van a llegar nombre y localidad
    var nombre = req.params.nombre;
    var localidad = req.params.localidad;

    // Cliente.find({$or:[{nombre:{$regex:nombre,$options:'i'}},
    // {localidad:{$regex:localidad, $options:'i'}}]})
    Cliente.find({nombre:{$regex:nombre,$options:'i'},
    localidad:{$regex:localidad, $options:'i'}})
    .exec((err, clientes)=>{ 
        // $regex crea un objeto 'expresión regular' para encontrar texto de acuerdo a un patrón.
        //find con solo las llaves busca todos los clientes. 
        //.exec() es para que se ejecute // Ambas son como si escribiéramos en mongoDB
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            clientes: clientes
        })
    });   
});

app.get('/:id', function(req, res, next){
    Cliente.findById(req.params.id, (err, cliente)=>{
        if(err){ //este if es en caso de que tenga errores
            return res.status(500).json({
                ok: false,                       
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok:true,
            cliente:cliente
        })
    })
})

// Peticion POST

app.post('/', (req, res)=>{

    var body = req.body;

    var cliente = new Cliente({
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

    cliente.save((err, clienteGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el cliente',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            cliente: clienteGuardado
        })
    });

});

//Petición PUT

app.put('/:id', function(req, res, next){  
    //findByIdAndUpdate --> busca un documento con su id y lo modifica
    Cliente.findByIdAndUpdate(req.params.id, req.body, function(err, datos){
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Cliente actualizado'
        });
    });

});

// Peticion DELETE

app.delete('/:id', function(req, res, error){
    //findByIdAndRemove --> busca un documento con su id y lo elimina
    Cliente.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Cliente' + datos.nombre + 'eliminado'; // para ver el nombre del eliminado
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })

})

module.exports = app;