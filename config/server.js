require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

//Biblioteca do Express
var express = require('express')
    , app = express();

//Um middleware 'body-parser' para poder tratar requisições GET e POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Para proteger contra Ataques DDOS
var RateLimit = require('express-rate-limit');
app.enable('trust proxy');

var limiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250,
    delayMs: 0
});

app.use(limiter);

//Permite a Requisição através de Scripts Externos
app.use(function (req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

//Um middleware do Express para a inserção de arquivos estáticos HTML, CSS ou JS
app.use(express.static('./app/public'));

//O tratador das diversas "Rotas" é o Consign
//Com ele podemos adicionar diversos módulos automaticamente
var consign = require('consign');
consign()
    .include('app/businessFunctions')
    .then('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('config/dbConnection.js')
    .into(app);

//O EJS que renderiza o HTML
app.set('view engine', 'ejs');

//Aqui eu direciono o local onde eu procuro as Views
app.set('views', './app/views');

module.exports = app;
