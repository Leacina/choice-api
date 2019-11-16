'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Cria novos campos title, description, archive, active, shared e teacher
    */
    const queue = [
     // queryInterface.removeColumn('Service', 'finishAt'),
      queryInterface.addColumn('Product_Decline', 'is_available', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
     queryInterface.removeColumn('Product_Decline', 'is_available'),
    ];

    return Promise.all(queue);
  }
};