import mongoose, { Schema } from "mongoose"

// Define the TeamMember schema
const teamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  education: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  idCard: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    enum: ["leadership", "development", "design", "marketing", "other"],
    default: "other",
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  social: {
    linkedin: String,
    twitter: String,
  },
  order: {
    type: Number,
    default: 0,
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

// Create and export the TeamMember model
const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema)

export default TeamMember
