"use server"

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Tweet from "../database/model/tweet.model";
import User from "../database/model/user.model";
import { CreateTwittParams } from "../types";
import { handleError } from "../utils";

export async function createTweet({ userId, content }: CreateTwittParams) {
    try {
        await connectToDatabase();

        const createdTweet = await Tweet.create({
            author: userId,
            content,
        })

        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    tweetes: createdTweet._id
                },
            }
        )
        revalidatePath("/")
        return JSON.parse(JSON.stringify(createdTweet))
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export async function fatchTweets(pageNumber = 1, pageSize = 10) {
    try {
        await connectToDatabase()

        const skipAmount = (pageNumber - 1) * pageSize

        const postsQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
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
            });

        const totalPostsCount = await Tweet.countDocuments({
            parentId: { $in: [null, undefined] },
        });

        const posts = await postsQuery.exec()

        const isNext = totalPostsCount > skipAmount + posts.length;

        return { posts:JSON.parse(JSON.stringify(posts)), isNext };

    } catch (error: any) {
        throw new Error(`Failed to get tweetes: ${error.message}`);
    }
}

export async function fetchTweetById(tweetId: string) {
    try {
        await connectToDatabase();

        const tweet = await Tweet.findById(tweetId)
            .populate({
                path: "author",
                model: User,
                select: "_id username avater firstName lastName",
            })
            .populate({
                path: "children",
                populate: [{
                    path: "author",
                    model: User,
                    select: "_id username avater parentId firstName lastName",
                },
                {
                    path: "children",
                    model: Tweet,
                    populate: {
                        path: "author",
                        model: User,
                        select: "_id username avater parentId firstName lastName"
                    }
                }
                ]
            })
            .exec();
        return JSON.parse(JSON.stringify(tweet));
    } catch (error: any) {
        throw new Error(`Failed to get tweet: ${error.message}`);
    }
}

export async function addCommentToTweet(
    tweetId: string,
    commentText: string,
    userId: string,
) {
    try {
        await connectToDatabase();

        const originalTweet = await Tweet.findById(tweetId)
        if (!originalTweet) {
            throw new Error("Tweet not found.")
        }
        const newComment = await Tweet.create({
            content: commentText,
            author: userId,
            parentId: tweetId,
        })
        originalTweet.children.push(newComment._id)

        await originalTweet.save();
        revalidatePath("/")
    } catch (error) {
        handleError(error)
    }
}

async function fetchAllChildTweet(tweetId: string): Promise<any[]> {
    await connectToDatabase()

    const childTweetes = await Tweet.find({
        parentId: tweetId
    })

    const descendantTweets = []
    for (const childTweet of childTweetes) {
        const descendants = await fetchAllChildTweet(childTweet._id)
        descendantTweets.push(childTweet, ...descendants)
    }
    return descendantTweets;
}

export async function deleteTweetById(tweetId: string) {
    try {
        await connectToDatabase();

        const mainTweet = await Tweet.findById(tweetId)
            .populate("author")

        if (!mainTweet) {
            throw new Error("Tweet not found.")
        }
        const descendantTweets = await fetchAllChildTweet(tweetId)

        const descendantTweetIds = [
            tweetId, ...descendantTweets.map((tweet) => tweet._id),
        ]
        const uniqueAuthorIds = new Set(
            [
                ...descendantTweets.map((tweet) => tweet.author?._id?.toString()),
                mainTweet.author?._id?.toString(),
            ].filter((tweetId) => tweetId !== undefined)
        )

        await Tweet.deleteMany({
            _id: { $in: descendantTweetIds }
        })

        await User.updateMany(
            { _id: { $in: Array.from(uniqueAuthorIds) } },
            { $pull: { tweetes: { $in: descendantTweetIds } } }
        )
        revalidatePath("/")
    } catch (error) {

    }
}

