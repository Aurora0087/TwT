import TweetCard from '@/components/cards/TweetCard'
import { fetchUserLikedTweet } from '@/lib/actions/user.action'
import { formatDateString } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function page({ params }: { params: { id: string } }) {

  const likedTweet = await fetchUserLikedTweet(params.id)


  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string

  console.log(likedTweet?.userLiked)
  return (
    <section className=' flex flex-col py-4 h-full'>
      {
        likedTweet?.userLiked.length === 0 ? (
          <div className='grid w-full place-content-center capitalize bg-slate-500/10 rounded-xl py-10'>
            <h3 className=' text-slate-500 text-xl font-semibold'>no liked tweets</h3>
          </div>
        ) : (
            <div className=' flex flex-col gap-4'>
            {
                likedTweet?.userLiked.map((tweet: any) => (
                <div key={tweet._id} className=' border-b border-white/20'>
                  <TweetCard
                    id={tweet._id}
                    currentUserId={userId}
                    parentId={tweet.parentId}
                    author={tweet.author}
                    comments={tweet.children}
                    likes={tweet.likes}
                    content={tweet.content}
                    createdAt={formatDateString(tweet.createdAt.toString())}
                  />
                </div>
                ))
            }
          </div>
        )
      }
    </section>
  )
}

export default page