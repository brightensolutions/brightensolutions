import mongoose, { Schema } from "mongoose"

// Hero Section Schema
const heroSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Brighten Solutions",
    },
    description: {
      type: String,
      required: true,
      default:
        "We are leading award-winning digital marketing agency and inbound marketing experts since 2016. We deliver solutions that are at the intersection of business goals & user goals but are always led by great design.",
    },
    buttonText: {
      type: String,
      default: "Start exploring",
    },
    buttonLink: {
      type: String,
      default: "/services",
    },
    heroImage: {
      type: String,
      default: "/brightensolution/hero-image.png",
    },
    services: [
      {
        text: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    socialLinks: [
      {
        platform: {
          type: String,
          enum: ["instagram", "facebook", "linkedin", "whatsapp", "twitter", "youtube"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    clientSection: {
      title: {
        type: String,
        default: "WHO WE WORK WITH",
      },
      enabled: {
        type: Boolean,
        default: true,
      },
    },
    clientLogos: [
      {
        name: {
          type: String,
          required: true,
        },
        logoUrl: {
          type: String,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create or use existing model
const HeroSection = mongoose.models.HeroSection || mongoose.model("HeroSection", heroSectionSchema)

export default HeroSection
