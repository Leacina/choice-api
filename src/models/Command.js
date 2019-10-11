module.exports = (sequelize, DataTypes) => {
    const Command = sequelize.define('Command',{
        is_ativo: DataTypes.BOOLEAN,
        start_date: DataTypes.DATE,
        id_caster_has_table: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Command
}