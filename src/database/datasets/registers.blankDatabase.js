var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { registers } = require('../../models');

registers.destroy({
    where: {},
    truncate: true
});