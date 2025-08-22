const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// @route   POST /api/upload/single
// @desc    Upload single image
// @access  Private (Admin)
router.post("/single", auth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    try {
      if (err) {
        if (
          err.message === "Only PNG, JPG, and JPEG image files are allowed!"
        ) {
          return res
            .status(400)
            .json({ message: "Only PNG, JPG, and JPEG files are allowed" });
        }
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File size too large. Maximum 5MB allowed" });
        }
        return res
          .status(400)
          .json({ message: err.message || "File upload failed" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({
        message: "File uploaded successfully",
        url: fileUrl,
        filename: req.file.filename,
      });
    } catch (error) {
      console.error("Single upload error:", error);
      res.status(500).json({ message: "File upload failed" });
    }
  });
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Private (Admin)
router.post("/multiple", auth, (req, res) => {
  upload.array("images", 10)(req, res, (err) => {
    try {
      if (err) {
        if (
          err.message === "Only PNG, JPG, and JPEG image files are allowed!"
        ) {
          return res
            .status(400)
            .json({ message: "Only PNG, JPG, and JPEG files are allowed" });
        }
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message:
              "One or more files are too large. Maximum 5MB per file allowed",
          });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res
            .status(400)
            .json({ message: "Too many files. Maximum 10 files allowed" });
        }
        return res
          .status(400)
          .json({ message: err.message || "File upload failed" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
      res.json({
        message: "Files uploaded successfully",
        urls: fileUrls,
        filenames: req.files.map((file) => file.filename),
      });
    } catch (error) {
      console.error("Multiple upload error:", error);
      res.status(500).json({ message: "File upload failed" });
    }
  });
});

// @route   DELETE /api/upload/:filename
// @desc    Delete uploaded image
// @access  Private (Admin)
router.delete("/:filename", auth, (req, res) => {
  try {
    const filename = req.params.filename;

    // Validate filename to prevent directory traversal
    if (
      !filename ||
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return res.status(400).json({ message: "Invalid filename" });
    }

    const filePath = path.join(__dirname, "../uploads", filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // File doesn't exist, but we'll still return success to avoid UI issues
      return res
        .status(200)
        .json({ message: "File removed (was already deleted)" });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);

    // Handle specific error types
    if (error.code === "ENOENT") {
      return res
        .status(200)
        .json({ message: "File removed (was already deleted)" });
    } else if (error.code === "EPERM" || error.code === "EACCES") {
      return res
        .status(403)
        .json({ message: "Permission denied: Cannot delete file" });
    }

    res.status(500).json({ message: "File deletion failed" });
  }
});

module.exports = router;
