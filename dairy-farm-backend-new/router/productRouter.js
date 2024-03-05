const express = require("express");
const { checkRole } = require("../middleware/authorise");
const { ProductModel } = require("../model/productModel");
const { authMiddleware } = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const productRouter = express.Router();

/* ================================= This route is used for getting data using searching sort category =============================== */
productRouter.get("/", async (req, res) => {
  const category = req.query.category;
  const name = req.query.name;
  const sortData = req.query.sort;
  try {
    if (category) {
      const data = await ProductModel.find({ category });
      res.status(200).json(data);
    } else if (sortData && category) {
      if (sortData == "asc") {
        const data = await ProductModel.find({ category }).sort({ price: 1 });
        res.status(200).json(data);
      } else {
        const data = await ProductModel.find({ category }).sort({ price: -1 });
        res.status(200).json(data);
      }
    } else if (sortData) {
      if (sortData == "asc") {
        const data = await ProductModel.find().sort({ price: 1 });
        res.status(200).json(data);
      } else {
        const data = await ProductModel.find().sort({ price: -1 });
        res.status(200).json(data);
      }
    } else if (name) {
      const data = await ProductModel.find({ name });
      res.status(200).json(data);
    } else {
      const data = await ProductModel.find();
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).send({ message: "Data not Found", error: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
/* ============================== This Route is used for Searching ==================================== */
productRouter.post("/search", async (req, res) => {
  try {
    let searchText = new RegExp(`${req.body.text}`, "i");
    const products = await ProductModel.find({
      $or: [{ name: searchText }, { description: searchText }],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No Products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

productRouter.use(authMiddleware); //auth middleware present here

/* =========================== This route for Adding the data to the database ====================================== */

productRouter.post("/create", checkRole("write"), async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.secretkey);
  const userID = decodedToken.userId;
  console.log("userId:", decodedToken.userId);
  const userId = userID; // Assuming you have user information in the request, adjust this based on your authentication setup
  console.log(payload)
  try {
    // Include the user ID when creating the product
    const product = new ProductModel({
      ...payload,
      createdBy: userId,
    });

    await product.save();
    res.status(200).json("Product Created Successfully!");
  } catch (error) {
    res
      .status(400)
      .send({ message: "Product not created", error: error.message });
  }
});

/* ================================== This Route for Updating the data ========================= */

productRouter.patch("/update/:id", checkRole("update"), async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      req.body, // Assuming you have an update payload in req.body
      { new: true } // This option returns the modified document rather than the original
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// return res.status(200).json({message:`product with id:${productId} has been updated Successfully`})
//     }
//     catch(error){
//         return   res.status(401).send({message:'Not Updated','Error':error.message})
//     }

// })

/* ================================== This Route for Deleted  the data ============================= */

productRouter.delete("/delete/:id", checkRole("delete"), async (req, res) => {
  const productId = req.params.id;
  try {
    await ProductModel.findByIdAndDelete(productId); // Pass productId directly as a string
    res
      .status(200)
      .json({ message: `The Product of ${productId} is deleted successfully` });
  } catch (error) {
    res.status(400).send({ message: "Unable to delete", error: error.message });
  }
});

module.exports = {
  productRouter,
};
