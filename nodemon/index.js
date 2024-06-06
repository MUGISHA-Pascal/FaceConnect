const express = require("express")
const app = express()
// basic return 
// app.get("/",(req,res)=>{
//     res.send("nodemon")
// })

// // returning json data
// app.get("/", (req, res) => {
//     const message = {
//         name: "pascal"
//     }
//     res.writeHead(200,{"Content-Type": "application/json"})
//     res.end(JSON.stringify(message)) 
    
// })

app.listen(3000, () => { 
    console.log("server running on : http://localhost:3000") 
}) 
 