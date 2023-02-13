// main file to display express behavior
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// trigger mongoose database
require("./db/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./roots/user"))
app.use(require("./roots/post"))

app.get("/", (req, res) => {
    res.json({msg: "hello world!"})
})

app.post("/", (req, res) => {
    console.log(req.body);
    res.send();
})

app.post('/postimage', function (req, res, next) {
    console.log("posted an image...");
    res.send();
});

// listen on port
app.listen(5500, () => console.log("app is listening on port 5500..."));
