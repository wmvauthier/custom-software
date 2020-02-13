module.exports.register = function (application, req, res) {

    var connection = application.config.dbConnection();
    var registerModel = new application.app.models.RegisterDAO(connection);

    var id_register = req.params.id;

    registerModel.getRegister(id_register, function (error, result) {
        if (result) {
            res.status(200).json(result[0]);
        }
        else {
            res.status(400).json({ 'error': error });
        }
    });

}

module.exports.registers = function (application, req, res) {

    var connection = application.config.dbConnection();
    var registerModel = new application.app.models.RegisterDAO(connection);

    registerModel.getAllRegisters(function (error, result) {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ 'error': error });
        }
    });

}

module.exports.insertRegister = function (application, req, res) {

    var connection = application.config.dbConnection();
    var registerModel = new application.app.models.RegisterDAO(connection);

    var register = req.body;

    registerModel.insertRegister(register, function (error, resultDB) {

        if (resultDB) {
            registerModel.getRegister(resultDB.insertId, function (error, result) {
                if (result) {
                    res.status(200).json(result[0]);
                }
                else {
                    res.status(400).json({ 'error': error });
                }
            });
        } else {
            res.status(400).json({ 'error': error });
        }

    });

}

module.exports.updateRegister = function (application, req, res) {

    var connection = application.config.dbConnection();
    var registerModel = new application.app.models.RegisterDAO(connection);

    var id_register = req.params.id;
    var register = req.body;

    registerModel.updateRegister(register, id_register, function (error, resultDB) {
        registerModel.getRegister(id_register, function (error, result) {
            if (result) {
                res.status(200).json(result[0]);
            }
            else {
                res.status(400).json({ 'error': error });
            }
        });
    });

}

module.exports.deleteRegister = function (application, req, res) {

    var connection = application.config.dbConnection();
    var registerModel = new application.app.models.RegisterDAO(connection);

    var id_register = req.params.id;

    registerModel.deleteRegister(id_register, function (error, result) {
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ 'error': error });
        }
    });

}