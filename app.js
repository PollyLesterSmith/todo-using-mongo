const mongodb = require('mongodb');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'index-mongo.html'), (err, content => {
            if (err) throw err;
            res.end(content);
        }))
    }
});



const PORT = process.env.port || 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
