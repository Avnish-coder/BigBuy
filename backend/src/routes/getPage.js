const express = require("express")
const { getHome,FetchData,getCart,postCart } = require("../controller/connect")
const { productModel } = require("../model/model")
const mainRouter = express.Router();

mainRouter
    .route("/")
    .get(getHome)

mainRouter
    .route("/products")
    .get(FetchData)

mainRouter
    .route("/getCart")
    .get(getCart)

mainRouter
    .route("/postCart")
    .post(postCart)

module.exports = {
    mainRouter
}