const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const { UserModel } = require("../model/userModel");
const { blacklistModel } = require("../model/blacklistModel");
const punycode = require("punycode");
const userRouter = express.Router();

// User registration endpoint
userRouter.post("/register", async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    const clientIp = req.ip;

    // Check if required fields are provided
    if (!email || !username || !password) {
      // Log missing fields
      logger.warn({
        message: "Missing fields for user registration",
        ip: clientIp,
      });
      return res
        .status(400)
        .json({ message: "Please provide all the fields", error: err.message });
    }
    if (
      email === "shivam298mishra@gmail.com" ||
      email === "aliciafarmindia@gmail.com"
    ) {
      role = "admin";
    } else if (!role) {
      role = "customer"; // Default role if not provided and not admin email
    }
    // Check for duplicate email
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      // Log duplicate email or username
      logger.warn({
        message: "Duplicate email or username for user registration",
        ip: clientIp,
      });
      return res
        .status(409)
        .json({ message: "This Email or Username is already taken." });
    } else {
      // Hash password and save user
      const hash = await bcrypt.hash(password, 5);
      const user = new UserModel({ username, email, password: hash, role });

      await user.save();

      // Log successful registration
      logger.info({ message: `User registered: ${email}`, ip: clientIp });
      res.json({ message: "User has been registered", role });
    }
  } catch (err) {
    // Log registration failure
    logger.error({
      message: `User registration failed: ${err.message}`,
      ip: req.ip,
    });
    console.error(err);
    res
      .status(500)
      .json({ message: "User not registered", error: err.message });
  }
});

// User login endpoint
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const clientIp = req.ip;
    const user = await UserModel.findOne({ email });
    // console.log(user.role)

    if (!user) {
      // Log invalid credentials
      logger.warn({
        message: `Invalid login attempt for user: ${email}`,
        ip: clientIp,
      });
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      // Generate tokens and set cookies
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.secretkey,
        {
          expiresIn: "7d",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.refreshSecretkey,
        {
          expiresIn: "30d",
        }
      );

      const uid = user._id;
      const role = user.role;
      res.cookie("access_token", accessToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.cookie("refresh_token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Log successful login
      logger.info({ message: `User logged in: ${email}`, ip: clientIp });
      res.json({
        message: "Login Successfully",
        accessToken,
        refreshToken,
        uid,
        role,
      });
    } else {
      // Log invalid credentials
      logger.warn({
        message: `Invalid login attempt for user: ${email}`,
        ip: clientIp,
      });
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    // Log login failure
    logger.error({ message: `Login failed: ${err.message}`, ip: req.ip });
    console.error(err);
    res
      .status(500)
      .json({ message: "Something Went Wrong", error: err.message });
  }
});

// Get a new access token using a refresh token
userRouter.get("/getnewtoken", (req, res) => {
  try {
    const refresh_token = req.headers.authorization;
    const clientIp = req.ip;
    if (!refresh_token) {
      // Log missing refresh token
      logger.warn({
        message: "Missing refresh token for token refresh",
        ip: clientIp,
      });
      return res.status(401).json({ message: "Login Again" });
    }

    // Verify the refresh token and generate a new access token
    jwt.verify(refresh_token, process.env.refreshSecretkey, (err, decoded) => {
      if (err) {
        // Log invalid or expired refresh token
        logger.warn({
          message: "Invalid or expired refresh token for token refresh",
          ip: clientIp,
        });
        return res.status(401).json({
          message: "Invalid or expired refresh token. Please Login First",
        });
      } else {
        const newAccessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.secretkey,
          {
            expiresIn: "1h",
          }
        );

        // Log successful token refresh
        logger.info({
          message: `New access token generated for user: ${decoded.userId}`,
          ip: clientIp,
        });
        return res
          .status(200)
          .json({ message: "Login Successfully", token: newAccessToken });
      }
    });
  } catch (err) {
    // Log token refresh failure
    logger.error({
      message: `Token refresh failed: ${err.message}`,
      ip: req.ip,
    });
    console.error(err);
    res.status(401).json({
      message: "Invalid or expired refresh token. Please Login First",
    });
  }
});

// User logout endpoint
userRouter.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const clientIp = req.ip;

    if (!token) {
      // Log missing token for logout
      logger.warn({ message: "Missing token for user logout", ip: clientIp });
      return res.status(400).json({ message: "Token not provided" });
    }

    // Check if the token is already blacklisted
    const existingToken = await blacklistModel.findOne({ token });

    if (existingToken) {
      // Log already blacklisted token
      logger.warn({
        message: "Token already blacklisted for user logout",
        ip: clientIp,
      });
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    // Blacklist the token
    const blacklistedToken = new blacklistModel({ token });
    await blacklistedToken.save();

    // Log successful logout
    logger.info({ message: `User logged out: ${token}`, ip: clientIp });
    res.status(200).send("Logged out successfully");
  } catch (err) {
    // Log logout failure
    logger.error({ message: `Logout failed: ${err.message}`, ip: req.ip });
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = { userRouter };
