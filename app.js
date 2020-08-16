const mongodb = require('mongodb');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        console.log('request received');
        const serveFilename = path.join(__dirname, 'index-mongo.html');
        console.log(serveFilename);
        fs.readFile(serveFilename, (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        })
    }
});



const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
