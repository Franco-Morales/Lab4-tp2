module.exports = (sequelize, type) => {
    return sequelize.define('pais',{
        codPais: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: type.STRING(50),
            allowNull: false
        },
        capital: {
            type: type.STRING(50),
            allowNull: false
        },
        region: {
            type: type.STRING(50),
            allowNull: false
        },
        poblacion: {
            type: type.BIGINT,
            allowNull: false
        },
        lat: {
            type: type.FLOAT,
            allowNull: false
        },
        lng: {
            type: type.FLOAT,
            allowNull: false
        }
    },{
        timestamps: false
    });
};