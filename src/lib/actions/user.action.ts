"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database"
import User from "../database/model/user.model";
import { CreateUserParams } from "../types"
import { handleError } from "../utils"
import Twitt from "../database/model/tweet.model";
import { error } from "console";
import Tweet from "../database/model/tweet.model";

//================= after someone signup using clerk
export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user)

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export async function updateUser(user: CreateUserParams) {
    try {
        await connectToDatabase();
    } catch (error) {
        handleError(error)
    }
}


//================= geting userInfo using database _id
export async function fatchUser(id: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(id)
        if (!user) {
            return
        }
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        return
        handleError(error)
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOne({ clerkId })

        if (!userToDelete) {
            throw new Error('User not found')
        }

        await Twitt.deleteMany({
            author: userToDelete._id
        });

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null

    } catch (error) {
        handleError(error)
    }
}

export async function fetchUserPosts(uId: string,pageNumber = 1, pageSize = 10) {
    try {
        connectToDatabase()

        try {
            await User.findById(uId)
        } catch (error) {
            return {
                userPosts: [],
                isNext:false,
            }
        }
        const skipAmount = (pageNumber -1)* pageSize

        const userPosts = await Tweet.find({
            author: uId,
            parentId: { $in: [null, undefined] },
        })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: "author",
                model: User,
                select: "_id username avater firstName lastName"
            })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: User,
                    select: "_id username parentId avater",
                },
            })
            .exec();
        
        const totalPostsCount = await Tweet.countDocuments({
            author: uId,
            parentId: { $in: [null, undefined] },
        })

        const isNext = totalPostsCount > (skipAmount+userPosts.length)

        return {
            userPosts: JSON.parse(JSON.stringify(userPosts)),
            isNext:isNext,
        }
    } catch (error) {
        handleError(error)
    }
}

export async function fetchUserComments(uId:string,pageNumber = 1, pageSize = 10) {
    try {
        await connectToDatabase()

        try {
            await User.findById(uId)
        } catch (error) {
            return {
                userComment: [],
                isNext:false,
            }
        }

        const skipAmount = (pageNumber-1)*pageSize

        const userComment = await Tweet.find({
            author: uId,
            parentId: { $exists: true, $ne: null },
        })
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: "author",
                model: User,
                select: "_id username avater firstName lastName"
            })
            .populate({
                path: "children",
                populate: {
                    path: "author",
                    model: User,
                    select: "_id username parentId avater",
                },
            })
            .exec();
        
        const totalCommentCount = await Tweet.countDocuments({
            author: uId,
            parentId: { $exists: true, $ne: null },
        })

        const isNext = totalCommentCount>(skipAmount + userComment.length)

        return {
            userComment: JSON.parse(JSON.stringify(userComment)),
            isNext:isNext,
        };
    } catch (error) {
        handleError(error)
    }
}