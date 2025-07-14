const express = require("express");
const { body, validationResult } = require("express-validator");
const Service = require("../models/Service");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    const services = await Service.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(query);

    res.json(services);
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (!service.isActive) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Get service error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/services
// @desc    Create service
// @access  Private (Admin)
router.post(
  "/",
  [
    auth,
    [
      body("title").not().isEmpty().trim().isLength({ max: 200 }),
      body("description").not().isEmpty().trim().isLength({ max: 1000 }),
      body("image").optional().isString(),
      body("detailDescription").optional().trim().isLength({ max: 2000 }),
      body("images").optional().isArray(),
    ],
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

      const { title, description, image, detailDescription, images } = req.body;

      const service = new Service({
        title,
        description,
        image: image || "",
        detailDescription: detailDescription || "",
        images: images || [],
        createdBy: req.user._id,
      });

      await service.save();

      await service.populate("createdBy", "name email");

      res.status(201).json(service);
    } catch (error) {
      console.error("Create service error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (Admin)
router.put(
  "/:id",
  [
    auth,
    [
      body("title").not().isEmpty().trim().isLength({ max: 200 }),
      body("description").not().isEmpty().trim().isLength({ max: 1000 }),
      body("image").optional().isString(),
      body("detailDescription").optional().trim().isLength({ max: 2000 }),
      body("images").optional().isArray(),
    ],
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

      const { title, description, image, detailDescription, images } = req.body;

      let service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      // Update fields
      service.title = title;
      service.description = description;
      service.image = image || service.image;
      service.detailDescription =
        detailDescription !== undefined
          ? detailDescription
          : service.detailDescription;
      service.images = images !== undefined ? images : service.images;

      await service.save();
      await service.populate("createdBy", "name email");

      res.json(service);
    } catch (error) {
      console.error("Update service error:", error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/services/:id
// @desc    Delete service (soft delete)
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Soft delete by setting isActive to false
    service.isActive = false;
    await service.save();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
