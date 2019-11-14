module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.BOOLEAN,
        id_company: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return User
}