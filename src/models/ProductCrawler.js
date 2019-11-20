module.exports = (sequelize, DataTypes) => {
    const Product_Crawler = sequelize.define('Product_Crawler',{
        name: DataTypes.STRING,
        ingredients:DataTypes.STRING,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Product_Crawler
}