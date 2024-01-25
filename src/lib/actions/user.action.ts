"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database"
import User from "../database/model/user.model";
import { CreateUserParams } from "../types"
import { handleError } from "../utils"
import Twitt from "../database/model/tweet.model";
import { error } from "console";


export async function createUser(user:CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user)

        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        handleError(error)
    }
}

export async function updateUser(user:CreateUserParams) {
    try {
        await connectToDatabase();
    } catch (error) {
        handleError(error)
    }
}

export async function fatchUser(id:string) {
    try {
        await connectToDatabase();

        const user = await User.findById(id)
        if (!user) {
            throw new Error("User do not exist.")
        }
        return user
    } catch (error) {
        handleError(error)
    }
}

export async function deleteUser( clerkId:string) {
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