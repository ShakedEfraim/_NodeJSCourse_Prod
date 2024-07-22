//Insert http module
const http = require("http");
const path = require("path");
const fs = require("fs");

//Create a server
const serveStaticFile = (request, response)=>{
    //Parse URL and determain file name
    console.log(`Request URL: ${request.url}`);

    //If no path is defined return index.html
    const url = request.url === '/' ? 'index.html' : request.url

    //__dirName - Path of project directory
    //public - convention name for public files directory
    const filePath = path.join(__dirname, "../public", url);
    const fileExt = path.extname(filePath);
    console.log(`File path: ${filePath}`);

    let contentType = "";
    switch (fileExt) {
        case ".html":
            contentType = 'text/html';
            break;
        case ".jpeg":
            contentType = 'image/jpeg';
            break;
        case ".css":
            contentType = 'text/css';
            break;
        default:
            contentType = 'text/html';
            break;
    }
    //Else look for desire file
    //Read Async
    fs.readFile(filePath, (error, content) => {
        if (error) {
        //If file doesn't exist
            if(error.code === 'ENOENT') {
                const errorfile = path.join(__dirname, "public", "404.html");
                fs.readFile(errorfile, (err, data)=>{
                    response.writeHead(404, {'Content-Type': contentType});
                    response.end(data, 'utf8');
                });
            } else {
                //Deafult error handling
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        } else {
            response.writeHead(200, {'Content-Type' : contentType});
            response.end(content, 'utf8');
        }
    });
};


module.exports = {serveStaticFile};