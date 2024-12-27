const { Sequelize } = require('sequelize')

//Leer fichero .env
require('dotenv').config();

//Conexion con la BD
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

//Prueba de conexion


(async () => {
    try {

        await sequelize.authenticate();
        console.log('Conexion a la bd establecida');

    } catch (error) {

        console.log('Error en la conexion a la BD');
    }


})();



module.exports = sequelize