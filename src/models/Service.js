module.exports = (sequelize, DataTypes) => {
    const Command = sequelize.define('Command',{
        startAt: DataTypes.DATE,
        finishAt: DataTypes.DATE,
        id_table: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Command
}