const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
let { productModel, cart } = require("../model/model");


async function getInfo() {
  let product = await cart.find();
  let Ids = product[0].productIds;
  let arr = []
  // let obj = {};
  // let titles = "";
  // let prices = 0;
  // obj.quantity = Ids.length;
  for (let i = 0; i < Ids.length; i++) {
    let proModels = await productModel.find({ id: `${Ids[i]}` });
    arr.push(proModels[0])
  }
  return arr;
}

getInfo();


async function stripePayment(req, res) {
  try {
    let obj = await getInfo();
    console.log(obj);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: obj.map(item => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        }
      }),
      success_url: `${process.env.SERVER_URL}`,
      cancel_url: `${process.env.SERVER_URL}`,
    });
    console.log(session.url);
    res.json({
      url: session.url,
    });
    let up = await cart.updateOne(
      { _id: "62618514a0101f0bffe3d8f8" },
      { items: 0, productIds: [] }
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  getInfo,
  stripePayment,
};

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
