const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

// Load environment variables
dotenv.config();

const cleanupAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/construction_firm",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");

    // Remove any old admin users with the old email
    const oldAdminDeleted = await User.deleteMany({
      email: "admin@constructpro.com",
    });

    if (oldAdminDeleted.deletedCount > 0) {
      console.log(`Removed ${oldAdminDeleted.deletedCount} old admin user(s)`);
    }

    // Check if current admin exists
    const currentAdmin = await User.findOne({
      email: "admin@chhikaraconstructions.com",
    });

    if (currentAdmin) {
      console.log("✅ Current admin user exists:");
      console.log("Email: admin@chhikaraconstructions.com");
      console.log("Password: admin123");
    } else {
      // Create new admin if doesn't exist
      const admin = new User({
        email: "admin@chhikaraconstructions.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
      });

      await admin.save();
      console.log("✅ New admin user created:");
      console.log("Email: admin@chhikaraconstructions.com");
      console.log("Password: admin123");
    }

    console.log("\n🎉 Admin cleanup completed successfully!");
    console.log(
      "You can now log in to the admin panel with the credentials above."
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during admin cleanup:", error);
    process.exit(1);
  }
};

cleanupAdmin();
