import mongoose, { Schema } from "mongoose"

// Define the Testimonial schema
const testimonialSchema = new Schema({
  quote: {
    type: String,
    required: [true, "Quote is required"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
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

// Create and export the Testimonial model
const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)

export default Testimonial
