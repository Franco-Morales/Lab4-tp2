const { Schema, model } = require("mongoose");


const paisSchema = new Schema({
    codPais: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    poblacion: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

module.exports = model('Paises',paisSchema);