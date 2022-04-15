const express = require("express")
const {listenLog,errorHandling, getHome} = require ("../controller/connect")

const mainRouter = express.Router();

mainRouter
.route("/")
.get(getHome)

module.exports = {
              mainRouter
}