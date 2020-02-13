'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('registers', [{
      register_name: 'Bill',
      register_company: 'Microsoft',
      register_value: 500
    }, {
      register_name: 'Mark',
      register_company: 'Facebook',
      register_value: 150.1
    }, {
      register_name: 'Linus',
      register_company: 'Linux',
      register_value: 250.2
    }, {
      register_name: 'Mark',
      register_company: 'Instagram',
      register_value: 80.9
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropAllTables();
  }

};
