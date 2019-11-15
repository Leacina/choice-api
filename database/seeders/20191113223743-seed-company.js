module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Company',
      [
        {
          id: 1,
          name: 'Empresa_1',
          cnpj: '07515823000107',
          phone: '48996956313',
          active: 1,
          id_segment: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Empresa_2',
          cnpj: '04172112000180',
          phone: '48996956314',
          active: 1,
          id_segment: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Empresa_3',
          cnpj: '11606444000191',
          phone: '48996956315',
          active: 1,
          id_segment: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },
  down: (queryInterface) => queryInterface.bulkDelete('Company', null, {}),
};