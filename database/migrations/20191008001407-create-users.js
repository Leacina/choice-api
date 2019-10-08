'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela company.
    */
    return queryInterface.createTable('User', {
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
      cell_phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_admin: {
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
      id_login:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Login',
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
      Drop da tabela company para retornar ao inicio.
    */
    return queryInterface.dropTable('User');
  }
};
