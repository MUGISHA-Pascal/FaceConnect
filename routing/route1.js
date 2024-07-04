const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("views", "./views");
app.set("view engine", 'ejs');
app.get("/file", (req, res) => {
    res.render("index");
});
app.get("/", (req, res) => {
    res.send("this is the first page");
});
app.get("/page", (req, res) => {
    res.send("this is the second page");
})
app.listen(3000, () => {
    console.log("app running")
})