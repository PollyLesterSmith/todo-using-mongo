const mongodb = require('mongodb');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // Init file path and content type
    let filePath = (req.url === '/' ? path.join(__dirname, 'index-mongo.html') : path.join(__dirname, req.url));
    let extName = path.extname(filePath);
    let contentType = "text/html";
    switch (extName) {
        case 'html' : contentType = "text/html"
        break;
        case 'css' : contentType = "text/css"
        break;
    }
        
    fs.readFile(filePath, (err, content) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': contentType });
        renderContent(content);
    })

    function renderContent(content) {
        res.write(content)
        res.end();
    }
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
