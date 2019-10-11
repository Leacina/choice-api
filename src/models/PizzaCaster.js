module.exports = (sequelize, DataTypes) => {
    const Pizza_Caster = sequelize.define('Pizza_Caster',{
        name: DataTypes.STRING,
        create_date: DataTypes.DATE,
        is_active: DataTypes.BOOLEAN,
        id_establishment: DataTypes.INTEGER,
    },{
        //Adicionado para gerar a tabela no singular
        freezeTableName: true,
    });

    return Pizza_Caster
}