module.exports = (sequelize, DataTypes) => {
    const Segment = sequelize.define('Segment',{
        name: DataTypes.STRING,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Segment
}