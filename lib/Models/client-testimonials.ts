import mongoose, { Schema } from "mongoose"

// Define the ClientTestimonials schema
const clientTestimonialsSchema = new Schema({
  badge: {
    type: String,
    default: "TESTIMONIALS",
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  highlightedText: {
    type: String,
    required: [true, "Highlighted text is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
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

// Create and export the ClientTestimonials model
const ClientTestimonials = mongoose.models.ClientTestimonials || mongoose.model("ClientTestimonials", clientTestimonialsSchema)

export default ClientTestimonials
