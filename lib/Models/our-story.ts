import mongoose, { Schema } from "mongoose"

// Define the OurStory schema
const ourStorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  milestones: [
    {
      year: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      achievements: [
        {
          type: String,
          required: true,
        },
      ],
      icon: {
        type: String,
        required: true,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create and export the OurStory model
const OurStory = mongoose.models.OurStory || mongoose.model("OurStory", ourStorySchema)

export default OurStory
