'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Pizza-Caster.
    */
    return queryInterface.createTable('Pizza_Caster', {
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
      create_date: {
        allowNull: false,
        type: DataTypes.DATE,
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
      Drop da tabela Pizza-Caster para retornar ao inicio.
    */
    return queryInterface.dropTable('Pizza_Caster');
  }
};
