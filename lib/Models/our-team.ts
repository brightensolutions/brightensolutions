import mongoose, { Schema } from "mongoose"

// Define the Filter schema
const filterSchema = new Schema({
  id: {
    type: String,
    required: [true, "Filter ID is required"],
    trim: true,
  },
  label: {
    type: String,
    required: [true, "Filter label is required"],
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
})

// Define the OurTeam schema
const ourTeamSchema = new Schema({
  badge: {
    type: String,
    default: "OUR TEAM",
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
  filters: {
    type: [filterSchema],
    default: [],
  },
  ctaTitle: {
    type: String,
    default: "Want to Join Our Team?",
    trim: true,
  },
  ctaDescription: {
    type: String,
    default: "We're always looking for talented individuals who are passionate about digital innovation and want to make a difference.",
    trim: true,
  },
  ctaButtonText: {
    type: String,
    default: "View Open Positions",
    trim: true,
  },
  ctaButtonLink: {
    type: String,
    default: "/careers",
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

// Create and export the OurTeam model
const OurTeam = mongoose.models.OurTeam || mongoose.model("OurTeam", ourTeamSchema)

export default OurTeam
