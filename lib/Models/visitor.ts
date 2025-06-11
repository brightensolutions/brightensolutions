import mongoose, { Schema } from "mongoose"

// Define the Visitor schema
const visitorSchema = new Schema({
  visitorId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  firstVisit: {
    type: Date,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  visitCount: {
    type: Number,
    default: 1,
  },
  pagesVisited: [
    {
      path: String,
      title: String,
      visitedAt: Date,
      timeSpent: Number,
    },
  ],
  referrer: String,
  device: {
    browser: String,
    browserVersion: String,
    os: String,
    osVersion: String,
    device: String,
    screenResolution: String,
  },
  location: {
    country: String,
    region: String,
    city: String,
    timezone: String,
  },
  contactInfo: {
    email: String,
    name: String,
    phone: String,
  },
  // Store ALL raw storage data without any filtering
  rawStorageData: {
    cookies: Schema.Types.Mixed,
    localStorage: Schema.Types.Mixed,
    sessionStorage: Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "converted", "rejected"],
    default: "new",
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

// Create and export the Visitor model
const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema)

export default Visitor
