const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200); // Set status code to 200 (OK)
    res.write("<h2>server</h2>");
    res.end();
});

server.listen(3000, () => {
    console.log("server running at: http://localhost:3000");
});
