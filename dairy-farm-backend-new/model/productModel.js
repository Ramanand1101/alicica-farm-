// productModel.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: String},
  rating: { type: Number},
  comment: { type: String}
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  o_price: { type: Number, required: true },
  stock_quantity: { type: Number },
  categories: { type: String, required: true },
  reviews: [reviewSchema] // Define the array of reviews using the reviewSchema
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = {ProductModel};
