const http = require('http');
const path = require('path');
const fs = require('fs');

const accessPass = require('./access.js')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pollyadmin:${accessPass}@learningcluster.rsfog.mongodb.net/todos?retryWrites=true&w=majority`;

const server = http.createServer((req, res) => {

    // Init file path and content type
    let filePath = (req.url === '/' ? path.join(__dirname, 'index-mongo-head.html') : path.join(__dirname, req.url));
    let extName = path.extname(filePath);
    let contentType = "text/html";
    switch (extName) {
        case '.html' : contentType = "text/html"
        break;
        case '.css' : contentType = "text/css"
        break;
    }
         
    fs.readFile(filePath, (err, content) => {
        console.log(`attempting to load ---> ${filePath}`);
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': contentType });
        renderContent(content);
    })

    function renderContent(content) {
        // Render file contents
        res.write(content);

        // If it's html, so in this case the main page render the todos
        if (extName = 'html') {
            
            var currentTodos;
            MongoClient.connect(uri, (err, client) => {
                if (err) {console.log(`It DIDN'T CONNECT because ${err}`)} else {
                    var db = client.db('todos');
                    db.collection('todoText', (err, collection) => {
                        collection.find().toArray( (err, results) => {
                            currentTodos = results;
                            res.write(currentTodos[0].todoString);
                            initFootRender();

                            // Render the footer
                            function initFootRender() {
                                filePath = path.join(__dirname, 'index-mongo-foot.html');
                                fs.readFile(filePath, (err, footcontent) => {
                                    if (err) throw err;
                                    renderFoot(footcontent);

                                    function renderFoot(contentToRend) {
                                        res.write(contentToRend);
                                        res.end();
                                    }
                                })
                            }
                        });
                    });
                }
            });



        } else { res.end(); }
    };



});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
