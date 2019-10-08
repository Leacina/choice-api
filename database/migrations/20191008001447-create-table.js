'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Pizza.
    */
    return queryInterface.createTable('Table', {
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
      code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_active: {
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
    return queryInterface.dropTable('Table');
  }
};
