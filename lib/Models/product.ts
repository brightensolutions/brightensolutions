import mongoose, { Schema } from "mongoose"

// Define the Product schema
const productSchema = new Schema({
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
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    trim: true,
    maxlength: [200, "Short description cannot be more than 200 characters"],
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
  features: {
    type: [String],
    required: [true, "At least one feature is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  popular: {
    type: Boolean,
    default: false,
  },
  comingSoon: {
    type: Boolean,
    default: false,
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

// Create and export the Product model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
