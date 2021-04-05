const Express = require("express");
const Cors = require("cors");
const apiRoutes = require("./routes/index.routes");


const Server = Express();

// Settings
Server.use(Cors());
Server.use(Express.json());
Server.use(Express.urlencoded({extended:false}));

// Port
Server.set('port',3021);

// Routes
Server.get('/', (req,res) => res.send("Bienvenido [API_REST] funcionando"));
Server.use('/api/v1',apiRoutes);


module.exports = Server;