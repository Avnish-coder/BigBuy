const express = require("express")
const { listenLog, errorHandling, getHome } = require("../controller/connect")
const { productModel } = require("../model/model")
const mainRouter = express.Router();

mainRouter
    .route("/")
    .get(getHome)

module.exports = {
    mainRouter
}