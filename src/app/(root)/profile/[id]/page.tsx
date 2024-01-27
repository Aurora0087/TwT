import TweetCard from '@/components/cards/TweetCard'
import { fetchUserPosts } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function profilePage({ params }: { params: { id: string } }) {

    const tweets = await fetchUserPosts(params.id)

    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string
    return (
        <div className='flex flex-col py-4'>
            {
                tweets.length>0 && tweets.map((tweet:any) => (
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
            }
        </div>
    )
}

export default profilePage