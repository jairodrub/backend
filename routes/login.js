var express = require ('express');
var bcryptjs = require('bcryptjs'); // Para encriptar contraseña
var jsonwebtoken = require('jsonwebtoken');
var Usuario = require('../models/usuario');

var app = express();
app.post('/', (req, res, next)=>{ // al poner la flecha, no ponemos function

    var body = req.body;

    Usuario.findOne({email: body.email}, (err, datos)=>{ // La función flecha recibe...
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                errores: err // Estos 3 err tienen que ser iguales para que no den fallo
            })
        }

        if (!datos) { // Cuando haya datos...
            return res.status(400).json({
                ok: false,
                mensaje: 'El correo electrónico no existe',
                errores: err
            })
        }

        if(!bcryptjs.compareSync(body.password, datos.password)){ 
            // Compara las contraseñas de base de datos con la que nos llega
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña no es correcta',
                errores: err
            })
        }

        var token = jsonwebtoken.sign({usuario:datos},'hghsidiasj',{expiresIn: 60})
        // expiresIn para que tenga caducidad, 3600ms

        res.status(200).json({ // En caso de éxito
            ok: true,
            token: token, // Con ECMAScript 6, se puede poner solo un token
            nombre: datos.nombre, // Le mandamos datos.nombre
            rol: datos.rol, // Con esto mandamos el rol
        })
    })

})

module.exports = app;