const mongodb = require('mongodb');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
     if(req.url === '/') {
        const serveFilename = path.join(__dirname, 'index-mongo.html');
        fs.readFile(serveFilename, (err, content) => {
            if (err) throw err;
            renderContent(content);
        })
        
        function renderContent(content) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    }
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
