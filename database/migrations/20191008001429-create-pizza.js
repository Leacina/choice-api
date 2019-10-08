'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Pizza.
    */
    return queryInterface.createTable('Pizza', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      flavor: {
        allowNull: false,
        type: DataTypes.STRING
      },
      ingredients: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      available: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      id_establishment:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Company',
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
      Drop da tabela Pizza para retornar ao inicio.
    */
    return queryInterface.dropTable('Pizza');
  }
};
