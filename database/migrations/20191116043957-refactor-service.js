'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Cria novos campos title, description, archive, active, shared e teacher
    */
    const queue = [
     // queryInterface.removeColumn('Service', 'finishAt'),
      queryInterface.changeColumn('Service', 'finishAt', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      })
    ];

    return Promise.all(queue);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Remove campos
    */
    const queue = [
     // queryInterface.removeColumn('Service', 'finishAt'),,
      queryInterface.changeColumn('Service', 'finishAt', {
        allowNull: false,
        type: Sequelize.DATE,
      })
    ];

    return Promise.all(queue);
  }
};