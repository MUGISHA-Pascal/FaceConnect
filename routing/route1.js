const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("this is the first page");
});
app.get("/page", (req, res) => {
    res.send("this is the second page");
})
app.listen(3000, () => {
    console.log("app running")
})