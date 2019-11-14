module.exports = {
  up: (queryInterface, Sequelize) => { return queryInterface.bulkInsert('User', 
    [{
        name: 'Administrador',
        email:"choice@unesc.net",
        password: '$2a$10$cRnf.WPvqq16MjV2qhJDXu6b.OBDpHxRAAJegnOxOfX0MHyeLX5rG',
        id_company: 1,
        createdAt:new Date(),
        updatedAt:new Date(),
    }], {});
    },
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};