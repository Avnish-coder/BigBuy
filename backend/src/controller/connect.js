const fs = require("fs");
const product = require("../../../frontend/data/products.json");
const { productModel } = require("../model/model");
let homePage =
    "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/index2.html";

function listenLog() {
    console.log("server is running");
}

function errorHandling(req, res) {
    res.json({
        message: "invalid command",
    });
}

function getHome(req, res) {
    createModel();
    // console.log(product.products);
    res.sendFile(homePage);
}

async function createModel() {
    await productModel.deleteMany()
    await productModel.create(product.products);
}

module.exports = { listenLog, errorHandling, getHome };