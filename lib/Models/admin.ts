import mongoose from "mongoose"

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Check if the model is already defined to prevent overwriting
const adminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema)

export default adminModel
