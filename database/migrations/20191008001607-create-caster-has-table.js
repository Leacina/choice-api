'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Caster-Has-Table.
    */
    return queryInterface.createTable('Caster_Has_Table', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_table:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Table',
          key: 'id'
        }
      },
      id_pizza_caster:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Pizza_Caster',
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
      Drop da tabela Caster-Has-Table para retornar ao inicio.
    */
    return queryInterface.dropTable('Caster_Has_Table');
  }
};
