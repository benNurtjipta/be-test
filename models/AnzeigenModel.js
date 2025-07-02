import mongoose from "mongoose"

const techstackSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { _id: false })

const descriptonSchema = new mongoose.Schema({
    text: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    fulltime: { type: Boolean, required: true },
    techstack: [techstackSchema]
}, { _id: false })

const anzeigenSchema = new mongoose.Schema({
    title: { type: String, required: true },
    descripton: descriptonSchema,
    appliedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    createdAt: { type: String }
})

export default mongoose.model("Anzeigen", anzeigenSchema)