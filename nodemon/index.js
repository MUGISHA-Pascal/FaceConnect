const express = require("express")
const app = express()
app.use(express.json())
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

// get with post
const courses = {
    id: 1,
    name: "pascal",
    id2: 0,
    name2: ""
}
app.get("/api/course", (req, res) => {
    res.send(courses)
})
app.post("/api/course", (req, res) => {
       res.send(courses);
})
app.listen(3000, () => {
    console.log("server running on : http://localhost:3000")
})
