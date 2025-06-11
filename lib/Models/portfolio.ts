import mongoose, { Schema } from "mongoose"

// Define the Portfolio schema
const portfolioSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  category: {
    type: [String],
    required: [true, "At least one category is required"],
    enum: ["web", "mobile", "design", "branding","Social Media"],
  },
  // Ensure both image and logo are separate fields
  image: {
    type: String,
    required: [true, "Project image is required"],
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  technologies: {
    type: [String],
    required: [true, "At least one technology is required"],
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  codeUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#F66526",
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the Portfolio model
const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema)

export default Portfolio
