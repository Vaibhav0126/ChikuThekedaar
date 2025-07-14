const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// @route   POST /api/upload/single
// @desc    Upload single image
// @access  Private (Admin)
router.post("/single", auth, upload.single("image"), (req, res) => {
  try {
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

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Private (Admin)
router.post("/multiple", auth, upload.array("images", 10), (req, res) => {
  try {
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

// @route   DELETE /api/upload/:filename
// @desc    Delete uploaded image
// @access  Private (Admin)
router.delete("/:filename", auth, (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({ message: "File deletion failed" });
  }
});

module.exports = router;
