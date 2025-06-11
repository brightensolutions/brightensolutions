import mongoose, { Schema } from "mongoose"

// Define the Achievement schema
const achievementSchema = new Schema({
  icon: {
    type: String,
    required: [true, "Icon is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  organization: {
    type: String,
    required: [true, "Organization is required"],
    trim: true,
  },
  year: {
    type: String,
    required: [true, "Year is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the Achievement model
const Achievement = mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema)

export default Achievement
