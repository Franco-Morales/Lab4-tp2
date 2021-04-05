const Sequelize = require('sequelize');
const PaisModel = require('./models/paises');


const sequelize = new Sequelize('tp2_a','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

const Pais = PaisModel(sequelize,Sequelize);

sequelize.sync({force: false})
    .then(()=>console.log('Tablas sincronizadas'))
    .catch((error)=>console.error(error));


module.exports = { Pais };