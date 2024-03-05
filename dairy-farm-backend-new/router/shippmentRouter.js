const express = require("express");
const { Order } = require("../model/orderModel");
const { authMiddleware } = require("../middleware/authenticate");
const addressRouter = express.Router();

addressRouter.post("/",  async (req, res) => {
    try {
        const { orderId, name, email, shipmentAddress, mobileNumber, city, state, postalCode } = req.body;
        console.log("sss", orderId, name, shipmentAddress, mobileNumber, city, state, postalCode)

        // Find the order by orderId
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found for the given orderId" });
        }

        // Check duplicacy based on shipmentAddress and mobileNumber
        const isDuplicate = existingOrder.shippmentAddress.some((address) => {
            return address.orderId === orderId;
        });

        if (isDuplicate) {
            return res.status(400).json({ message: "Duplicate address. Cannot add the same address again." });
        }

        // Create a new address object
        const newAddress = {
            orderId: orderId,
            name: name,
            email: email,
            shipmentAddress: shipmentAddress,
            mobileNumber: mobileNumber,
            city: city,
            state: state,
            postalCode: postalCode,
            // country: country
        };

        // Ensure that shippmentAddress field is an array and initialize it if undefined
        existingOrder.shippmentAddress = existingOrder.shippmentAddress || [];
        existingOrder.shippmentAddress.push(newAddress);

        // Save the changes to the existing order
        await existingOrder.save();

        res.status(200).json("Address added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = { addressRouter };
