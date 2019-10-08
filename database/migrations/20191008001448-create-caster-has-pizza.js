'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Caster-Has-Pizza.
    */
    return queryInterface.createTable('Caster_Has_Pizza', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_pizza:{
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Pizza',
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
      Drop da tabela Caster-Has-Pizza para retornar ao inicio.
    */
    return queryInterface.dropTable('Caster_Has_Pizza');
  }
};
