'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('registers', {
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
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropAllTables();
  }

};
