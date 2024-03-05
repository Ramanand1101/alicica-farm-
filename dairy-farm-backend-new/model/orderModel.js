const mongoose = require("mongoose");

// Define a schema for water-related information
const orderItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  name: {
    type: String,
    required: true,
  },
  amt: {
    type: Number,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  litrePerDay: {
    type: Number,
    required: true,
  },
});
const addressSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  shipmentAddress: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  // Other fields related to the shipment address
});
const orderSchema = new mongoose.Schema({
  items: [orderItemSchema], // Array of order items, each item follows the orderItemSchema,
  shippmentAddress: [addressSchema],
});
// Create a model from the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
};
