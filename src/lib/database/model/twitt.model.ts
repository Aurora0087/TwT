import mongoose from "mongoose";

const twittSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Twitt",
        },
    ],
})

const Twitt = mongoose.models.Twitt || mongoose.model('Twitt', twittSchema)

export default Twitt;