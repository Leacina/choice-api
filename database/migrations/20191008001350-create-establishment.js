'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela company.
    */
    return queryInterface.createTable('Company', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      cnpj: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cell_phone: {
        allowNull: false,
        type: DataTypes.STRING,
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
      Drop da tabela company para retornar ao inicio.
    */
    return queryInterface.dropTable('Company');
  }
};
