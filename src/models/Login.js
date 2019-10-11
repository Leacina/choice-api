module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('Login',{
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Login
}