import mongoose, { Schema } from "mongoose"

// Define the AboutHero schema
const aboutHeroSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  titleHighlight: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stats: [
    {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
  buttons: [
    {
      text: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      isPrimary: {
        type: Boolean,
        default: false,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the AboutHero model
const AboutHero = mongoose.models.AboutHero || mongoose.model("AboutHero", aboutHeroSchema)

export default AboutHero
