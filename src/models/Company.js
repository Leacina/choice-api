module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company',{
        name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        phone: DataTypes.STRING,
        active: DataTypes.STRING,
        id_segment: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Company
}