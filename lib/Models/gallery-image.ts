import mongoose, { Schema, type Document } from "mongoose"

export interface IGalleryImage extends Document {
  title: string
  description: string
  category: string
  imageUrl: string
  fileName: string
  fileSize: number
  fileType: string
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      default: "Other",
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    fileName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    fileType: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>("GalleryImage", GalleryImageSchema)
