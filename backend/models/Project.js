const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    detailDescription: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    client: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
projectSchema.index({ title: "text", description: "text", category: "text" });

module.exports = mongoose.model("Project", projectSchema);
