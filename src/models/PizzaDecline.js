module.exports = (sequelize, DataTypes) => {
    const Pizza_Decline = sequelize.define('Pizza_Decline',{
        id_command: DataTypes.INTEGER,
        id_pizza: DataTypes.INTEGER,
    });

    return Pizza_Decline
}