const express = require("express");
const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = new RegExp(category, "i");
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.isActive) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/projects
// @desc    Create project
// @access  Private (Admin)
router.post(
  "/",
  [
    auth,
    [
      body("title").not().isEmpty().trim().isLength({ max: 200 }),
      body("description").not().isEmpty().trim().isLength({ max: 1000 }),
      body("category").not().isEmpty().trim().isLength({ max: 100 }),
      body("image").optional().isString(),
      body("detailDescription").optional().trim().isLength({ max: 2000 }),
      body("location").optional().trim().isLength({ max: 200 }),
      body("client").optional().trim().isLength({ max: 200 }),
      body("images").optional().isArray(),
      body("status").optional().isIn(["completed", "in-progress", "planned"]),
      body("startDate").optional().isISO8601(),
      body("endDate").optional().isISO8601(),
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

      const {
        title,
        description,
        category,
        image,
        detailDescription,
        location,
        client,
        images,
        status,
        startDate,
        endDate,
      } = req.body;

      const project = new Project({
        title,
        description,
        category,
        image: image || "",
        detailDescription: detailDescription || "",
        location: location || "",
        client: client || "",
        images: images || [],
        status: status || "completed",
        startDate: startDate || Date.now(),
        endDate: endDate || null,
        createdBy: req.user._id,
      });

      await project.save();

      await project.populate("createdBy", "name email");

      res.status(201).json(project);
    } catch (error) {
      console.error("Create project error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put(
  "/:id",
  [
    auth,
    [
      body("title").not().isEmpty().trim().isLength({ max: 200 }),
      body("description").not().isEmpty().trim().isLength({ max: 1000 }),
      body("category").not().isEmpty().trim().isLength({ max: 100 }),
      body("image").optional().isString(),
      body("detailDescription").optional().trim().isLength({ max: 2000 }),
      body("location").optional().trim().isLength({ max: 200 }),
      body("client").optional().trim().isLength({ max: 200 }),
      body("images").optional().isArray(),
      body("status").optional().isIn(["completed", "in-progress", "planned"]),
      body("startDate").optional().isISO8601(),
      body("endDate").optional().isISO8601(),
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

      const {
        title,
        description,
        category,
        image,
        detailDescription,
        location,
        client,
        images,
        status,
        startDate,
        endDate,
      } = req.body;

      let project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Update fields
      project.title = title;
      project.description = description;
      project.category = category;
      project.image = image || project.image;
      project.detailDescription =
        detailDescription !== undefined
          ? detailDescription
          : project.detailDescription;
      project.location = location !== undefined ? location : project.location;
      project.client = client !== undefined ? client : project.client;
      project.images = images !== undefined ? images : project.images;
      project.status = status || project.status;
      project.startDate = startDate || project.startDate;
      project.endDate = endDate || project.endDate;

      await project.save();
      await project.populate("createdBy", "name email");

      res.json(project);
    } catch (error) {
      console.error("Update project error:", error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/projects/:id
// @desc    Delete project (soft delete)
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Soft delete by setting isActive to false
    project.isActive = false;
    await project.save();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/projects/categories
// @desc    Get all unique categories
// @access  Public
router.get("/categories", async (req, res) => {
  try {
    const categories = await Project.distinct("category", { isActive: true });
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
