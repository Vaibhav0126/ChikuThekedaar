const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendOTPEmail } = require("../utils/emailService");

const router = express.Router();

// Rate limiting for login attempts
const loginAttempts = new Map();

const rateLimitLogin = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  if (!loginAttempts.has(ip)) {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const attempt = loginAttempts.get(ip);

  if (now > attempt.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (attempt.count >= maxAttempts) {
    return res.status(429).json({
      message: "Too many login attempts. Please try again in 15 minutes.",
    });
  }

  attempt.count++;
  next();
};

// @route   POST /api/auth/request-otp
// @desc    Request OTP for admin login (always sends to fixed admin email)
// @access  Public
router.post("/request-otp", rateLimitLogin, async (req, res) => {
  try {
    // Fixed admin email - no user input required for security
    const adminEmail = "admin@chhikaraconstructions.com";

    // Check if admin user exists
    const user = await User.findOne({ email: adminEmail, role: "admin" });
    if (!user) {
      console.log(
        `OTP request - admin user not found in database from IP: ${req.ip}`
      );
      return res.status(500).json({ message: "Admin account not configured" });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log(`OTP request for deactivated admin from IP: ${req.ip}`);
      return res.status(400).json({ message: "Account is deactivated" });
    }

    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP to the fixed admin email (chhikaraconstructions@gmail.com)
    const emailSent = await sendOTPEmail(
      "chhikaraconstructions@gmail.com",
      otp
    );
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    console.log(`OTP sent to admin email from IP: ${req.ip}`);
    res.json({
      message: "OTP sent to admin email address",
      otpExpires: user.otpExpires,
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and login admin (uses fixed admin email)
// @access  Public
router.post(
  "/verify-otp",
  rateLimitLogin,
  [body("otp").isLength({ min: 6, max: 6 }).isNumeric()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid OTP format",
          errors: errors.array(),
        });
      }

      const { otp } = req.body;

      // Fixed admin email - no user input required for security
      const adminEmail = "admin@chhikaraconstructions.com";

      // Find admin user
      const user = await User.findOne({ email: adminEmail, role: "admin" });
      if (!user) {
        console.log(
          `OTP verification - admin user not found in database from IP: ${req.ip}`
        );
        return res
          .status(500)
          .json({ message: "Admin account not configured" });
      }

      // Check if user is active
      if (!user.isActive) {
        console.log(
          `OTP verification for deactivated admin from IP: ${req.ip}`
        );
        return res.status(400).json({ message: "Account is deactivated" });
      }

      // Verify OTP
      const isValidOTP = user.verifyOTP(otp);
      if (!isValidOTP) {
        console.log(`Invalid OTP attempt from IP: ${req.ip}`);
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Clear OTP after successful verification
      user.clearOTP();
      await user.save();

      // Generate JWT token
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "your_jwt_secret_key_here",
        { expiresIn: "7d" }
      );

      console.log(`Successful OTP login from IP: ${req.ip}`);

      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Password-based login removed for security
// Only OTP-based authentication is supported

// @route   POST /api/auth/register
// @desc    Register admin user (for initial setup)
// @access  Public
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 2 }).trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid input data",
          errors: errors.array(),
        });
      }

      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const user = new User({
        email,
        password,
        name,
        role: "admin",
      });

      await user.save();

      // Generate JWT token
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "your_jwt_secret_key_here",
        { expiresIn: "7d" }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
