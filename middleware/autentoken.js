var jsonwebtoken = require('jsonwebtoken');

exports.verificarToken = function(req, res, next){ // exports: para exportar propiedades
    // tiene un request porque va a tener una petición
    var token = req.query.token; // query = consulta. Espera un token en la consulta

    jsonwebtoken.verify(token, 'hghsidiasj', (err, decoded)=>{ // decoded (código desencriptado)
        // Recibe 3 cosas, token, la clave (que la tenemos en el login.js...)
        // Si el token no tiene esa palabra secreta 'hghsidiasj' dará este error:
        if (err){
            return res.status(400).json({
                ok: false,
                mensaje: 'token incorrecto',
                errores: err
            })
        }

        req.usuario = decoded.usuario;
        next();
    }) 
                                                
}