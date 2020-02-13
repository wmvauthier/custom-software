//Inclue as configurações do Servidor
var app = require('./config/server.js');

app.listen(process.env.PORT || 3000, "0.0.0.0", function () {
    console.log("Sistema de Cadastro SobMedida Online!");
});