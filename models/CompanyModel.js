import mongoose from "mongoose"

const companySchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    hashedPassword: {type: String, required: true },
    companyName: { type: String, required: true },
    recruiter: { type: String },
    role: { type: String, default: "company"},
    adsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anzeigen" }],
    createdAt: { type: String }
})

export default mongoose.model("Company", companySchema)