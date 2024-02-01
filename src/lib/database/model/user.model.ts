import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
    _id: string;
    clerkId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    profilebg?: string;
    bio?: string;
    createdAt: Date;
    tweetes: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    following: Schema.Types.ObjectId[];
    likedtweet: Schema.Types.ObjectId[];
}

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    avater: String,
    profilebg:String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tweetes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    likedtweet: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
        }
    ]
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;