const faker = require("faker");
const { factory } = require("factory-girl");
const { registers } = require("../src/models");

factory.define("registers", registers, {
  register_name: faker.name.findName(),
  register_company: faker.company.companyName(),
  register_value: faker.finance.amount()
});

module.exports = factory;