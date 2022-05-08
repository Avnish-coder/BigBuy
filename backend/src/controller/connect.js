const { productModel, cart } = require("../model/model");
const { sendMail } = require("./NodeMailer");
const { getInfo } = require("./stripe");
const path = require("path");

let cartPage = path.resolve("../frontend/product.ejs");
let gatewayPage = path.resolve("../frontend/gateway.html");
let loginPage = path.resolve("../frontend/login.html");
let addCart = path.resolve("../frontend/cart.html");
let homePage = path.resolve("../frontend/index2.html");

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

async function getCartPage(req, res) {
  let ans = await productModel.findOne(req.params)
  let image =  (ans.image).slice(1)
  ans.image = image
  res.render(cartPage,{data:  ans});
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

function gateway(req, res) {
  res.sendFile(gatewayPage);
}

async function price(req, res) {
  let ans = await getInfo();
  res.json({
    price: ans.price,
  });
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
  price,
};
