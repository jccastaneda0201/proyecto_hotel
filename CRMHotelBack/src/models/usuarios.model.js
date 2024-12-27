const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");




const Usuario = sequelize.define('Usuario', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER

  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  apellidos: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING(9),
    allownull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(45),
    allownull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allownull: false
  },
  rol: {
    type: DataTypes.STRING(45),
    allownull: true,

  },
  sexo: {
    type: DataTypes.ENUM('MASC', 'FEM'),
    allownull: true
  },
  telefono: {
    type: DataTypes.INTEGER,
    allownull: false
  },
  pais: {
    type: DataTypes.STRING(45),
    allownull: false
  },
  direccion: {
    type: DataTypes.STRING(45),
    allownull: true
  },
  ciudad: {
    type: DataTypes.STRING(45),
    allownull: false
  },
  cod_postal: {
    type: DataTypes.STRING(10),
    allownull: false
  }


}, {
  sequelize, tableName: 'usuarios', timestamps: false
});



module.exports = Usuario
