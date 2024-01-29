import TweetCard from '@/components/cards/TweetCard'
import LoadPosts from '@/components/shared/LoadPosts'
import { fetchUserPosts } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

async function profilePage({ params }: { params: { id: string } }) {

    const res = await fetchUserPosts(params.id)
    const tweets = res?.userPosts

    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string
    return (
        <div className='flex flex-col py-4 gap-4'>
            {
                tweets.length === 0 ? (
                    <div className=' w-full px-6 py-10 grid place-content-center bg-slate-500/10 rounded-lg'>
                        <h3 className=' text-2xl text-slate-500 font-semibold w-full text-center'>No Tweet</h3>
                        <Link href={"/post-tweet"} className=' text-blue-500 w-fit flex hover:underline capitalize'>
                            <MoveLeft />
                            Post your first tweet
                        </Link>
                </div>
                ): (
                    tweets.map((tweet:any) => (
                    <div key={tweet._id} className=' border-b border-white/20'>
                        <TweetCard
                            id={tweet._id}
                            currentUserId={userId}
                            parentId={tweet.parentId}
                            author={tweet.author}
                            comments={tweet.children}
                            likes={tweet.likes}
                            content={tweet.content}
                            createdAt={tweet.createdAt.toString()}
                        />
                    </div>
                ))
                ) 
            }
            <LoadPosts
                type="USER-TWEET"
                uId={params.id}
                isNext={res?.isNext!}
                currentUserId={userId}
            />
        </div>
    )
}

export default profilePage