module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service',{
        startAt: DataTypes.DATE,
        finishAt: DataTypes.DATE,
        id_table: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Service
}