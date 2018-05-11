var express = require('express');
var bodyParser = require('body-parser');

var proveedor = require('./routes/proveedor'); // importamos el archivo.js de routes  
var factura = require('./routes/factura'); // Nuevo
var usuario = require('./routes/usuario');
var login = require('./routes/login');
var cliente = require('./routes/cliente');
var presupuesto = require('./routes/presupuesto');
var sesion = require('./routes/sesion');
var articulo = require('./routes/articulo');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost:27101,localhost:27102,localhost:27103/erp?replicaSet=clusterserv',
//  {promiseLibrary: require('bluebird')})
mongoose.connect('mongodb://localhost:27017/erp',{promiseLibrary: require('bluebird')})
//recibe en primer lugar la url de la base de datos y luego importamos bluebird
            .then(()=>{
                console.log('Conectado a la DB'); // .then para cuando funciona bien
            })
            .catch((err)=>{
              console.error(err);  // .catch para cuando funciona mal
            })

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(bodyParser.json({}));//para poder leer los  json
app.use(bodyParser.urlencoded({'extended': false}));

app.use('/proveedor', proveedor);
app.use('/factura', factura); // Nuevo
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/cliente', cliente);
app.use('/presupuesto', presupuesto);
app.use('/sesion', sesion);
app.use('/articulo', articulo);

app.listen(3000, function(){
    console.log('Servidor ok en puerto 3000');
})