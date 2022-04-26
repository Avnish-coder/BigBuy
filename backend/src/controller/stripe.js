// This is your test secret API key.
let SK =
  "sk_test_51KaHyuSBOaa25T5lGhNwZspxZI2mf15lAaRhdGqFRLRvTwTNWvPc8lS9lzQqoIOTXC7M4EFXEGRhU69fsDIdxCsM00CJKxSNqA";
const stripe = require("stripe")(SK);
let { productModel, cart } = require("../model/model");

async function getInfo() {
  let product = await cart.find();
  let Ids = product[0].productIds;
  let obj = {};
  let titles = "";
  let prices = 0;
  for (let i = 0; i < Ids.length; i++) {
    let proModels = await productModel.find({ id: `${Ids[i]}` });
    titles += proModels[0].title + ". ";
    prices += proModels[0].price;
  }
  obj.title = titles;
  obj.price = prices;
//   let up = await cart.updateOne(
//     { _id: "62618514a0101f0bffe3d8f8" },
//     { items: 0, productIds: [] }
//   );

  return obj;
}

getInfo()
const YOUR_DOMAIN = "localhost:8080";
async function stripePayment() {
  let obj = await getInfo();
  console.log(obj);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        name: "cart checkout",
        description: obj.title,
        amount: obj.price,
        currency: "usd",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
    //   res.redirect(303, session.url);
  });
}


module.exports = {
              getInfo,
              stripePayment
}