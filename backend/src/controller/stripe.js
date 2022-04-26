const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
let { productModel, cart } = require("../model/model");

async function getInfo() {
  let product = await cart.find();
  let Ids = product[0].productIds;
  let obj = {};
  let titles = "";
  let prices = 0;
  obj.quantity = Ids.length
  for (let i = 0; i < Ids.length; i++) {
    let proModels = await productModel.find({ id: `${Ids[i]}` });
    titles += proModels[0].title + " ";
    prices += proModels[0].price;
  }
  obj.title = titles;
  obj.price = prices;
  return obj;
}


const YOUR_DOMAIN = "localhost:8080";
async function stripePayment(req,res) {
  try {
  let obj = await getInfo();
  console.log(obj);
  const session = await stripe.checkout.sessions.create({
    
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        name: "cart checkout",
        description: obj.title,
        amount : obj.price,
        // price: obj.price,
        currency: "usd",
        quantity: obj.quantity,
      },
    ],
    success_url: `${process.env.SERVER_URL}`,
    cancel_url: `${process.env.SERVER_URL}`,
  });
  console.log(session.url);
  res.json({
    url : session.url,
    
  });
     let up = await cart.updateOne(
      { _id: "62618514a0101f0bffe3d8f8" },
      { items: 0, productIds: [] }
    );
} catch (e) {
  res.status(500).json({ error: e.message })
}
}

module.exports = {
  getInfo,
  stripePayment,
}


// const customer = await stripe.customers.create({
//   name: 'Jenny Rosen',
//   address: {
//     line1: '510 Townsend St',
//     postal_code: '98140',
//     city: 'San Francisco',
//     state: 'CA',
//     country: 'US',
//   },
// });