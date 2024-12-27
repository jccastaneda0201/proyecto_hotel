const sequelize = require('../config/db');

const { DataTypes } = require('sequelize');



const Imagenes = sequelize.define(
    'imagenes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ruta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        habitaciones_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'imagenes',
        timestamps: false
    }
)




module.exports = Imagenes;