const fs = require("fs");
const product = require("../../../frontend/data/products.json");
const { productModel, cart } = require("../model/model");
let homePage =
  "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/index2.html";

let cartPage = "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/product.html"
function listenLog() {
  console.log("server is running");
}

function errorHandling(req, res) {
  res.json({
    message: "invalid command",
  });
}

function getHome(req, res) {
  res.sendFile(homePage);
}

async function getCart(req, res) {
  let carts = await cart.find();
  res.json({
    carts: carts,
  });
}

async function postCart(req, res) {
    console.log(req.body);
  let carts = await cart.updateOne({"_id" : "62618514a0101f0bffe3d8f8"},req.body);
  res.json({
    carts: carts,
  });
}

function getCartPage(req,res) {
  res.sendFile(cartPage)
  
}


// (async function createModel() {
//     // await productModel.deleteMany()
//     // const productModels = new productModel(product.products)
//     // await productModels.save();
//     let awas = await productModel.create(product.products)
// })();

async function FetchData(req, res) {
  let product = await productModel.find();
  res.json({
    products: product,
  });
}

module.exports = {
  listenLog,
  errorHandling,
  getHome,
  FetchData,
  getCart,
  postCart,
  getCartPage
};
