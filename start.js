var server = require('./server');
var http = require('http');

server.set('port', 3000);

var httpd = http.createServer(server);

httpd.listen(port);

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    switch(error.code) {
        case 'EADDRINUSE':
            console.error('Port 3000 is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

httpd.on('error', onError);

function onListening() {
    var addr = server.address();
    console.log('listening on port 3000');
}

httpd.on('listening', onListening);
