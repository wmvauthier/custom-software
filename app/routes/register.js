module.exports = function (application) {

    application.get('/register', function (req, res) {
        application.app.controllers.register.registers(application, req, res);
    });

    application.get('/register/:id', function (req, res) {
        application.app.controllers.register.register(application, req, res);
    });

    application.post('/register', function (req, res) {
        application.app.controllers.register.insertRegister(application, req, res);
    });

    application.put('/register/:id', function (req, res) {
        application.app.controllers.register.updateRegister(application, req, res);
    });

    application.delete('/register/:id', function (req, res) {
        application.app.controllers.register.deleteRegister(application, req, res);
    });

}