import mongoose, { Schema } from "mongoose"

// Email Account Schema
const EmailAccountSchema = new Schema({
  emailAddress: String,
  password: String,
  loginUrl: { type: String, default: "https://mail.google.com" },
  notes: String,
})

// Additional Service Schema
const AdditionalServiceSchema = new Schema({
  serviceName: String,
  serviceType: String,
  loginUrl: String,
  username: String,
  password: String,
  expiryDate: Date,
  notes: String,
})

// Domain Schema
const DomainSchema = new Schema({
  name: String, // Removed required
  purchasePlatform: String, // Removed required
  loginUrl: String, // Removed required
  username: String, // Removed required
  password: String, // Removed required
  expiryDate: Date, // Removed required
  autoRenewal: { type: Boolean, default: false },
  registrar: String,
  notes: String,
})

// Google Workspace Schema
const GoogleWorkspaceSchema = new Schema({
  accountName: String,
  adminEmail: String,
  adminPassword: String,
  loginUrl: { type: String, default: "https://admin.google.com" },
  subscriptionType: String,
  monthlyFee: Number,
  renewalDate: Date,
  emailAccounts: [EmailAccountSchema],
  notes: String,
})

// Website Schema
const WebsiteSchema = new Schema({
  technology: String, // Removed required
  framework: String,
  hostingProvider: String, // Removed required
  serverType: String,
  serverUrl: String, // Removed required
  cpanelUrl: String,
  username: String, // Removed required
  password: String, // Removed required
  databaseName: String,
  databaseUsername: String,
  databasePassword: String,
  sshAccess: { type: Boolean, default: false },
  sshUsername: String,
  sshPassword: String,
  notes: String,
})

// Client Info Schema
const ClientInfoSchema = new Schema(
  {
    clientName: String, // Removed required
    clientCode: String,
    contactPerson: String,
    contactEmail: String,
    contactPhone: String,
    notes: String,
    domain: DomainSchema,
    googleWorkspace: GoogleWorkspaceSchema,
    website: WebsiteSchema,
    additionalServices: [AdditionalServiceSchema],
  },
  { timestamps: true },
)

// Create indexes for searching
ClientInfoSchema.index({ clientName: "text", "domain.name": "text", clientCode: "text" })

// Check if model already exists to prevent overwriting during hot reloads
const ClientInfo = mongoose.models.ClientInfo || mongoose.model("ClientInfo", ClientInfoSchema)

export default ClientInfo