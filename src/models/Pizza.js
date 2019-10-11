module.exports = (sequelize, DataTypes) => {
    const Pizza = sequelize.define('Pizza',{
        flavor: DataTypes.STRING,
        ingredients: DataTypes.STRING,
        url: DataTypes.STRING,
        available: DataTypes.BOOLEAN,
        id_establishment: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Pizza
}