import TweetCard from '@/components/cards/TweetCard'
import Comment from '@/components/forms/Comment'
import { fetchTweetById } from '@/lib/actions/tweet.action'
import { fatchUser } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function tweetPage({ params }: { params: { id: string } }) {
    const tweet = await fetchTweetById(params.id)

    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string

    const currentUser = await fatchUser(userId)

    console.log(tweet)
    return (
        <section className=' relative flex flex-col p-6 rounded-xl py-6'>
            <div className=' border-b border-white/50'>
                <TweetCard
                    id={tweet._id}
                    currentUserId={userId}
                    parentId={tweet.parentId}
                    content={tweet.content}
                    author={tweet.author}
                    createdAt={tweet.createdAt}
                    comments={tweet.children}
                    likes={tweet.likes}
                />
            </div>

            <div className=' border-b border-white/50 bg-slate-500/10'>
                <Comment
                    tweetId={tweet._id}
                    currentUserId={userId}
                    currentUserImg={currentUser.avater}
                />
            </div>
            <div className=' rounded-b-xl bg-slate-500/10 pl-10 flex flex-col gap-1'>
                {tweet.children.map((childItem: any) => {
                    return (
                        <div key={childItem._id} className=' border-l border-white/20 border-b'>
                        <TweetCard
                        id={childItem._id}
                        currentUserId={userId}
                        parentId={childItem.parentId}
                        content={childItem.content}
                        author={childItem.author}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        likes={childItem.likes}
                        isComment
                    />
                        </div>)
                    
                })}
            </div>
        </section>
    )
}

export default tweetPage