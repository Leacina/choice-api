module.exports = (sequelize, DataTypes) => {
    const Tablet = sequelize.define('Tablet',{
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        is_active: DataTypes.STRING,
        id_table: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Tablet
}