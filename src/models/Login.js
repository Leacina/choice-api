module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('Login',{
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    return Login
}