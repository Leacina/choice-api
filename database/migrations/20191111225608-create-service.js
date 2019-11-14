'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Command.
    */
    return queryInterface.createTable('Service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      startAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      finishAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      id_table: {
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Table',
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
      Drop da tabela Command para retornar ao inicio.
    */
    return queryInterface.dropTable('Service');
  }
};
