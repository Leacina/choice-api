module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        name: DataTypes.STRING,
        cell_phone: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
        id_establishment: DataTypes.INTEGER,
        id_login: DataTypes.INTEGER,
    });

    return User
}