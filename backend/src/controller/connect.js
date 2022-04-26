const { productModel, cart } = require("../model/model");
const { sendMail } = require("./NodeMailer");
const {getInfo} = require("./stripe")

let homePage ="/Users/manishsharma/Desktop/Projects/BigBuy/frontend/index2.html";
  let cartPage = "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/product.html";
  let gatewayPage = "/Users/manishsharma/Desktop/Projects/BigBuy/frontend/gateway.html";
  let loginPage = "../../../frontend/login.html";
  let addCart = "../../../frontend/cart.html";

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
  let carts = await cart.updateOne(
    { _id: "62618514a0101f0bffe3d8f8" },
    req.body
  );
  res.json({
    carts: carts,
  });
}

function getCartPage(req, res) {
  res.sendFile(cartPage);
}

function getLoginPage(req, res) {
  res.sendFile(loginPage);
}

async function FetchData(req, res) {
  let product = await productModel.find();
  res.json({
    products: product,
  });
}

function getAddCart(req, res) {
  res.sendFile(addCart);
}

function subscribe(req, res) {
  let email = req.body.email;
  sendMail("subscribe", email);
  res.json({
    happy: "new year",
  });
}

function gateway(req,res) {
  res.sendFile(gatewayPage)
  
}

async function price(req,res) {
  let ans  = await getInfo()
  res.json({
    price: ans.price
  })
  
}

module.exports = {
  listenLog,
  errorHandling,
  getHome,
  FetchData,
  getCart,
  postCart,
  getCartPage,
  getLoginPage,
  getAddCart,
  subscribe,
  gateway,
  price
};
