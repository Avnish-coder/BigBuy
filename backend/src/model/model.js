const mongoose = require("mongoose");
const url = process.env.MONGO_URL
mongoose
  .connect(url)
  .then((db) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db isn't connected");
  });

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    // unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  items: {
    type: Number,
    default: 0,
  },

  productIds: {
    type: Array,
  },
});

const userSchema = mongoose.Schema({});

const productModel = mongoose.model("productModel", productSchema);
const cart = mongoose.model("cart", cartSchema);

module.exports = {
  productModel,
  cart,
};
