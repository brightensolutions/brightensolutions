import mongoose, { Schema } from "mongoose"

// Define the Service schema
const serviceSchema = new Schema({
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
  icon: {
    type: String,
    required: [true, "Icon is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
  featuredProject: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sequence: {
    type: Number,
    default: 0,
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

// Create and export the Service model
const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema)

export default Service
