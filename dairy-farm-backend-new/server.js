const express = require("express");
const { connectedDB } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./router/userRouter");
const { productRouter } = require("./router/productRouter");
const { authMiddleware } = require("./middleware/authenticate");
const { queryRouter } = require("./router/queryRouter");
const { addressRouter } = require("./router/shippmentRouter");
const { orderRouter } = require("./router/orderRouter");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.send("Home-Page");
  } catch (error) {
    console.log(`Error:${error}`);
  }
});

app.use("/user", userRouter);
app.use("/product", productRouter);

app.use("/query", queryRouter);

// Apply authentication middleware only to routes below this line
app.use(authMiddleware);

app.use("/order", orderRouter);
app.use("/shippment", addressRouter);

/* listen the server code present here */
const port = process.env.port || 8080;
app.listen(port, async () => {
  try {
    //connected db
    await connectedDB;
    console.log("Database connected Successfully");
  } catch (err) {
    console.log(err.message);
  }
  console.log(`server is running on port ${port}`);
});
