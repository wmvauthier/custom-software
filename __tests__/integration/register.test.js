const app = ('../../config/server');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { registers } = require('../../src/models');
const factory = require('../factories');

describe('Register CRUD', () => {

    it('should create a register', async () => {

        const user = await factory.create('registers');

        const dbUser = await registers.findAll({
            where: {
                register_name: user.register_name,
                register_company: user.register_company,
                register_value: user.register_value
            }
        });

        expect(dbUser[0].dataValues.id).toBeTruthy();
        expect(dbUser[0].dataValues.register_name).toBe(user.register_name);
        expect(dbUser[0].dataValues.register_company).toBe(user.register_company);
        expect(dbUser[0].dataValues.register_value).toBe(parseFloat(user.register_value));

    });

    it('should update a register', async () => {

        var company = 'New Company';

        await registers.update(
            { register_company: company },
            { returning: true, where: { id: 1 } }
        );

        const dbUser = await registers.findAll({ where: { id: 1 } });

        expect(dbUser[0].dataValues.id).toBeTruthy();
        expect(dbUser[0].dataValues.register_company).toBe(company);

    });

    it('should delete a register', async () => {

        await registers.destroy(
            { where: { id: 2 } }
        );

        const dbUser = await registers.findAll({ where: { id: 2 } });

        expect(dbUser).toEqual([]);

    });

});