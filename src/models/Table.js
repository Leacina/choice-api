module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define('Table',{
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        id_company: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Table
}