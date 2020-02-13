// Aqui são colocados os Models da Aplicação, que executam as Queries e Consultas
function RegisterDAO(connection) {
    this._connection = connection
}

RegisterDAO.prototype.getRegister = function (id, callback) {
    let sql = `SELECT * FROM registers WHERE id = ?`;
    let data = [id];
    this._connection.query(sql, data, callback);
};

RegisterDAO.prototype.getAllRegisters = function (callback) {
    let sql = `SELECT * FROM registers`;
    this._connection.query(sql, callback);
};

RegisterDAO.prototype.getUserByCompany = function (company, callback) {
    let sql = `SELECT * FROM registers WHERE register_company = ?`;
    let data = [company];
    this._connection.query(sql, data, callback);
};

RegisterDAO.prototype.insertRegister = function (register, callback) {
    let sql = `INSERT INTO registers SET
    register_name = ? ,
    register_company = ? ,
    register_value = ?`;

    let data = [register.register_name,
    register.register_company,
    parseFloat(register.register_value)];

    this._connection.query(sql, data, callback);
};

RegisterDAO.prototype.updateRegister = function (register, id_register, callback) {
    let sql = `UPDATE registers SET
    register_name = ? ,
    register_company = ? ,
    register_value = ?
    WHERE id = ?`;

    let data = [register.register_name,
    register.register_company,
    parseFloat(register.register_value),
        id_register];

    this._connection.query(sql, data, callback);
};

RegisterDAO.prototype.deleteRegister = function (id_register, callback) {
    let sql = `DELETE FROM registers WHERE id = ?`;
    let data = [id_register];
    this._connection.query(sql, data, callback);
};

module.exports = function () {
    return RegisterDAO;
}
