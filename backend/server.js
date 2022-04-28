const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config()
const { listenLog, errorHandling } = require("./src/controller/connect.js");
const { mainRouter } = require("./src/routes/getPage.js");
const port = process.env.PORT || 8080

const server = express();
server.listen(port, listenLog);
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan());

server.use(express.static("../frontend"));
server.use("/", mainRouter);

server.use("*", errorHandling);