var express = require ('express');
var bcryptjs = require('bcryptjs'); // Para encriptar contraseña

var Sesion = require('../models/sesion');

var app = express();

app.get('/', (req, res, next) =>{

    var nombre = req.query.nombre; // Tiene que ver con el nombre:nombre de abajo

    Sesion.find({nombre:nombre}).sort({_id:-1}).exec((err, sesiones)=>{ 
        //find con solo las llaves busca todos los sesiones. //.exec() es para que se ejecute
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            sesiones: sesiones

        })
    });   
});

app.post('/', (req, res, next)=>{

    var body = req.body;

    var sesion = new Sesion({
        nombre: body.nombre,
        login: body.login,
        logout: body.logout,
        duracion: body.duracion
    })

    sesion.save((err, sesionGuardado)=>{
        // Con save, mongoose guardaría la base de datos
        // Graba, y de ((err... hacia delante es respuesta))
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al registrar sesión',
                errores: err
            })
        }

        res.status(200).json({
            ok: true,
            sesion: sesionGuardado
        })
    });

});

module.exports = app;

/*

    app.peticiónHttp ( función callback (
        lee el mensaje
        crea el objeto con la clase del modelo mongoose
        objeto.metodoMongoose ( función callback (
            gestiona la respuesta
        ))
    ))

*/