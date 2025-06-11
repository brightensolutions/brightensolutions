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
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
})

// Define the Stat schema
const statSchema = new Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
    required: [true, "Label is required"],
    trim: true,
  },
  isYearsOfExperience: {
    type: Boolean,
    default: false,
  },
})

// Define the Award schema
const awardSchema = new Schema({
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
  year: {
    type: String,
    required: [true, "Year is required"],
    trim: true,
  },
  color: {
    type: String,
    default: "#F66526",
    trim: true,
  },
  textColor: {
    type: String,
    default: "#FFFFFF",
    trim: true,
  },
})

// Define the Experience schema
const experienceSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, "Subtitle is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  foundingDate: {
    type: Date,
    required: [true, "Founding date is required"],
    default: new Date("2016-12-01"),
  },
  buttonText: {
    type: String,
    default: "Learn more about our journey",
    trim: true,
  },
  buttonLink: {
    type: String,
    default: "/about",
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
  achievements: {
    type: [achievementSchema],
    default: [],
  },
  stats: {
    type: [statSchema],
    default: [],
  },
  awards: {
    type: [awardSchema],
    default: [],
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

// Create and export the Experience model
const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema)

export default Experience
