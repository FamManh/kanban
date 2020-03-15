const express = require("express");
const bodyParser = require('body-parser')
const routes = require("./routes");
var mongoose = require("mongoose");

// init express app
const app = express();

// middleware
// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/kanban", { useNewUrlParser: true });

// routes
app.use("/", routes.auth);

// post put patch

const port = 5000;
// app listen 
app.listen(port);
