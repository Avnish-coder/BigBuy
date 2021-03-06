const express = require("express")
const { getHome,FetchData,getCart,postCart,gateway,price,getCartPage,getAddCart,getLoginPage,subscribe } = require("../controller/connect")
const { productModel } = require("../model/model")
const mainRouter = express.Router();
const {stripePayment} = require("../controller/stripe")


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

mainRouter
    .route("/pro")
    .get(getCartPage)

mainRouter
    .route("/pro/:id")
    .get(getCartPage )

mainRouter
    .route("/auth")
    .get(getLoginPage)

mainRouter
    .route("/cart")
    .get(getAddCart)

mainRouter
    .route("/subscribed")
    .post(subscribe)

mainRouter
    .route("/cartProductPrice")
    .get(price)

mainRouter
    .route("/gateway")
    .get(gateway)

mainRouter
    .route("/checkout")
    .post(stripePayment)


module.exports = {
    mainRouter
}