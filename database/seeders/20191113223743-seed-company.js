module.exports = {
  up: (queryInterface, Sequelize) => { return queryInterface.bulkInsert('Company', 
    [{
        id: 1,
        name: 'Administrador',
        cnpj: '07515823000107',
        phone: '48996956313',
        active: 1,
        id_segment: 1,
        createdAt:new Date(),
        updatedAt:new Date(),
    }], {});
    },
  down: (queryInterface) => queryInterface.bulkDelete('Company', null, {}),
};