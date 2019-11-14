module.exports = (sequelize, DataTypes) => {
    const Produtc = sequelize.define('Pizza',{
        ingredients: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        id_company: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Produtc
}