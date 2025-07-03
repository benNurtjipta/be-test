import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    hashedPassword: {type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, default: "applicant"},
    appliedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anzeigen" }],
    createdAt: { type: String }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false
})

userSchema.virtual("fullname").get(function () {
    const fullname = `${this.firstname} ${this.lastname}`
    return fullname
})

export default mongoose.model("User", userSchema)