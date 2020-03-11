const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req,res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port, hostname, () => {
    console.log(`=============================================`);
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`WebServer Success Started`);
    console.log(`=============================================`);
});