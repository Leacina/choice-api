'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Pizza-Decline.
    */
    return queryInterface.createTable('Pizza_Decline', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_command:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Command',
          key: 'id'
        }
      },
      id_pizza: {
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Pizza',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    /*
      Drop da tabela Pizza-Decline para retornar ao inicio.
    */
    return queryInterface.dropTable('Pizza_Decline');
  }
};
