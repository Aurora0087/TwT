import mongoose, { Types, Document, Schema, models, model } from "mongoose";

export interface ITweet extends Document {
    _id: string;
    content: string;
    author: Types.ObjectId | string;
    createdAt: Date;
    likes?: Types.ObjectId[] | string[];
    parentId?: Types.ObjectId | string;
    children?: Types.ObjectId[] | ITweet[];
}

const tweetSchema = new Schema({
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
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        },
    ],
})

const Tweet = models.Tweet || model('Tweet', tweetSchema)

export default Tweet;