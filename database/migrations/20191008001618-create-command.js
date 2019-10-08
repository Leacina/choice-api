'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Criação da tabela Command.
    */
    return queryInterface.createTable('Command', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      is_ativo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      id_caster_has_table: {
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {        
          model: 'Caster_Has_Table',
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
    return queryInterface.dropTable('Command');
  }
};
