module.exports = (sequelize, DataTypes) => {
    const Product_Mining = sequelize.define('Product_Mining',{
        name: DataTypes.STRING,
        ingredients:DataTypes.STRING,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Product_Mining
}