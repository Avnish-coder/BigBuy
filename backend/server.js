const express = require("express")
const cors = require("cors")
const helmet  = require("helmet")
const morgan = require("morgan")
const path = require("path")
const {listenLog,errorHandling, getHome} = require ("./src/controller/connect.js")
const {mainRouter} = require("./src/routes/getPage.js");

const server = express();
server.use(express.static("../frontend"))
server.use("/",mainRouter)
server.use(cors())
server.use(morgan())
server.use(helmet())


server.listen(8080,listenLog)
server.use("*",errorHandling)