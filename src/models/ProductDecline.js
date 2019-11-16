module.exports = (sequelize, DataTypes) => {
    const Product_Decline = sequelize.define('Product_Decline',{
        id_service: DataTypes.INTEGER,
        id_pizza: DataTypes.INTEGER,
        is_available: DataTypes.BOOLEAN,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Product_Decline
}