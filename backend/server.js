const express = require("express");
const cors = require("cors");
let ejs = require("ejs");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const server = express();
require("dotenv").config();
const { listenLog, errorHandling } = require("./src/controller/connect.js");
const { mainRouter } = require("./src/routes/getPage.js");
const port = process.env.PORT || 8080;
server.set("view engine", "ejs");

server.listen(port, listenLog);
server.use(express.json());
server.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
server.use(cors());
// server.use(morgan());

server.use(express.static(path.resolve("../frontend")));
// server.use(express.static(__dirname + '/frontend'));
server.use("/", mainRouter);

server.use("*", errorHandling);
