module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table',{
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        id_establishment: DataTypes.INTEGER,
    });

    return Table
}