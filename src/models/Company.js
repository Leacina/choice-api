module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company',{
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        cell_phone: DataTypes.STRING,
    });

    return Company
}