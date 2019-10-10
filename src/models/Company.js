module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company',{
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        cell_phone: DataTypes.STRING,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Company
}