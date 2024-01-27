import TweetCard from '@/components/cards/TweetCard'
import Comment from '@/components/forms/Comment'
import BackButton from '@/components/shared/BackButton'
import { Button } from '@/components/ui/button'
import { fetchTweetById } from '@/lib/actions/tweet.action'
import { fatchUser } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { MoreHorizontal, MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

async function tweetPage({ params }: { params: { id: string } }) {
    const tweet = await fetchTweetById(params.id)

    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string

    const currentUser = await fatchUser(userId)

    console.log("tweet : " + tweet)
    return (
        <>
            <BackButton />
            <section className=' relative flex flex-col p-6 rounded-xl py-6'>
                {
                    tweet === null ? (
                        <div className='grid place-content-center min-h-screen'>
                            <h3 className=' text-3xl font-semibold'>
                                Tweet dont exist.
                            </h3>
                            <Link href={"/"} className=' text-blue-500 flex'><MoveLeft /> Go back to home</Link>
                        </div>

                    ) : (
                        <>
                            <div className=' border-b border-white/50 relative overflow-hidden'>
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
                        </>

                    )
                }

            </section>
        </>

    )
}

export default tweetPage