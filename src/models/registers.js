module.exports = (sequelize, DataTypes) => {

    const registers = sequelize.define("registers", {
        register_name: DataTypes.STRING,
        register_company: DataTypes.STRING,
        register_value: DataTypes.FLOAT,
    }, {
        timestamps: false
    });

    return registers;

}