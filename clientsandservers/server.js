// a simple server
// const http = require("http")
// const server = http.createServer((req, res) => {
//     console.log("request made")
//     console.log(req.url, req.method)
//     res.setHeader("Content-Type", "text/html");
//     res.write("<h2>this is my server</h2>");
//     res.write("<h1>this is also it</h1>");
//     res.end()
// });
// server.listen(3000, "localhost", () => {
//     console.log("listening for requests on port 3000")
// });

// returning html pages
// const http=require("http");
// const fs=require("fs")
// const server=http.createServer((req,res)=>{
//     res.setHeader("Content-Type","text/html");
//     fs.readFile("./index.html",(err,data)=>{
//         if (err){
//             console.log(err);
//             res.end();
//         }else{
// res.write(data);
// res.end()
//         }
//     })
// })
// server.listen(3000,"localhost",()=>{
//     console.log("running on : http://localhost:3000")
// })

//basic routing
// const http = require('http');
// const fs=require("fs")
// const server=http.createServer((req,res)=>{
//     var path="./";
//     switch(req.url){
//         case "/page1":
//             path += "index.html";
//         break;
//         case "/page2":
//             path += "index2.html";
//         break;
//         default:
//             path += '404.html';
//         break;
//     }
//     fs.readFile(path,(err,data)=>{
//         if(err){
//             console.log(err);
//             res.end()
//         }else{
//             res.write(data);
//             res.end();
//         }
//     })
// })
// server.listen(3000,"localhost",()=>{
//     console.log("the server is running on : http://localhost:3000")
// })

// status codes
// const http=require("http");
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
//     var path="./";
//     switch(req.url){
//         case '/page1':
//             path +="index.html";
//             res.statusCode=200;
//         break;
//         case '/page2':
//             path +="index2.html";
//             res.statusCode=200;
//         break;
//         default:
//             path +="404.html";
//             res.statusCode=404;
//         break;
//     }
//     fs.readFile(path,(err,data)=>{
// if (err){
//     console.log(err);
// }else{
//     res.write(data);
//     res.end();
// }
//     });
// });
// server.listen(3000,"localhost",()=>{
//     console.log("running on :http://localhost:3000");
// })

//redirecting
const http = require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    var path="./";
    switch(req.url){
        case '/page1':
            path += 'index.html';
        break;
        case '/page2':
            path += 'index2.html';
        break;
        case '/page3':
res.statusCode=301;
res.setHeader("location","/page1");
        break;
        default:
            path +='404.html';
        break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.write(data);
            res.end();
        }
    })
})
server.listen(3000,"localhost",()=>{
    console.log("running on : http://localhost:3000")
})