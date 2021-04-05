const Server = require("./server");
require('./database');

function main() {
    let port = Server.get('port');
    Server.listen(port);
    console.log(`Server on Port:${port}`);
}

main();