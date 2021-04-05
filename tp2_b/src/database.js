const mongoose = require("mongoose");


const URI = "mongodb://localhost/tp2b";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => console.log('Conexión establecida con MongoDB'));