module.exports = {
  up: (queryInterface, Sequelize) => { return queryInterface.bulkInsert('Segment', 
    [{
        id: 1,
        name: 'Pizzarias',
        createdAt:new Date(),
        updatedAt:new Date(),
    }], {});
    },
  down: (queryInterface) => queryInterface.bulkDelete('Segment', null, {}),
};