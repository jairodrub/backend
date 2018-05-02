var express = require ('express');
var bcryptjs = require('bcryptjs'); // Para encriptar contraseña

var Usuario = require('../models/usuario');

var app = express();

app.get('/', (req, res, next) =>{
    Usuario.find({}).exec((err, usuarios)=>{ //find con solo las llaves busca todos los usuarios. 
        //.exec() es para que se ejecute
        if(err){
            return res.status(500).json({
                ok: false,                        //este if es en caso de que tenga errores
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        })
    });   
});

app.post('/', function(req, res, next){ // La función la espera el require, el responsive y el next.
    var body = req.body;

    var usuario = new Usuario ({ // Usuario es igual que el de la 4
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        rol:body.rol
    })

    usuario.save((err, datos)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado correctamente' //En caso de éxito, una respuesta...
        })    
    })
})

app.put('/:id', (req, res, next)=>{ // Los parámetros van con dos puntos (:)

        var body = req.body;

        Usuario.findById(req.params.id, (err, usuario)=>{
            if(err){
                return res.status(500).json({ // 500 porque estaría caído
                    // El res y req de arriba entre paréntesis tiene que ser igual que estos
                    ok: false,
                    mensaje: 'Error de conexión'
                }) 
            }
        
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err, usuarioModificado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje:'Error al actualizar el usuario',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado correctamente'
            })
        })
    })
})

app.delete('/:id', function(req, res, error){ // recibe un id
    //findByIdAndRemove --> busca un documento con su id y lo elimina
    Usuario.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'El usuario fue eliminado'; // para ver el nombre del eliminado
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })

})

module.exports = app;