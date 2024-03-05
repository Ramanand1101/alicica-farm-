const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Order } = require("../model/orderModel");

const orderRouter = express.Router();
// Place an order and redirect to delivery address pag
orderRouter.post("/placed", async (req, res) => {
  const items = req.body;
  console.log("fearfsdf", items);
  try {
    // Validate required fields
    if (!items) {
      return res.status(400).json({ message: "All fields are required" });
      console.log("sss");
    }

    // Create a new order
    const order = new Order({
      items: items,
    });
    // Save the order to the database
    await order.save();

    // Respond with the order details
    res
      .status(201)
      .json({ message: "Order placed successfully", order: order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    console.log("order", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific order by ID
orderRouter.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update order status to complete
orderRouter.put("/:orderId/complete", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = "complete";
    await order.save();
    res.status(200).json({ message: "Order status updated to complete" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a specific order by ID
orderRouter.delete("/order/delete/:orderId/:itemId", async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    // Find the order by orderId
    const order = await Order.findById(orderId);

    if (!order) {
      // If the order is not found, return a 404 error
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the index of the item in the order's items array
    const itemIndex = order.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      // If the item is not found in the order, return a 404 error
      return res.status(404).json({ error: "Item not found in the order" });
    }

    // Calculate the total price of the item being removed
    const deletedItemTotalPrice = order.items[itemIndex].totalPrice;

    // Remove the item from the order's items array
    order.items.splice(itemIndex, 1);

    // Update the cartTotalPrice of the order by subtracting the deleted item's total price
    order.cartTotalPrice -= deletedItemTotalPrice;

    // Save the updated order to the database
    await order.save();

    // Send a success response to the client
    res.status(200).json({
      message: "Item deleted successfully",
      deletedItem: order.items[itemIndex],
    });
  } catch (error) {
    // Handle errors, e.g., database error or validation error
    console.error("Error deleting item from order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  orderRouter,
};
