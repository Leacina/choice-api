module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User',
      [
        {
          name: 'Administrador_1',
          email: "choice@unesc.net",
          password: '$2a$10$cRnf.WPvqq16MjV2qhJDXu6b.OBDpHxRAAJegnOxOfX0MHyeLX5rG',
          id_company: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Administrador_2',
          email: "choice2@unesc.net",
          password: '$2a$10$cRnf.WPvqq16MjV2qhJDXu6b.OBDpHxRAAJegnOxOfX0MHyeLX5rG',
          id_company: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Administrador_3',
          email: "choice3@unesc.net",
          password: '$2a$10$cRnf.WPvqq16MjV2qhJDXu6b.OBDpHxRAAJegnOxOfX0MHyeLX5rG',
          id_company: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },
  down: (queryInterface) => queryInterface.bulkDelete('User', null, {}),
};