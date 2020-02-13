var Sequelize = require('sequelize');
const Op = Sequelize.Op;

queryInterface.createTable('registers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    register_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    register_company: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    register_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
});