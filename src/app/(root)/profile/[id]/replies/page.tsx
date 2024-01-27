import TweetCard from '@/components/cards/TweetCard'
import { fetchUserComments } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import React from 'react'

async function page({ params }: { params: { id: string } }) {

  const replys = await fetchUserComments(params.id)

  const { sessionClaims } = auth()

  const userId = sessionClaims?.userId as string
  return (
    <div className='flex flex-col py-4'>

      {
        replys.map((comment: any) => (
          <div key={comment._id} className=' border-b border-white/20'>
            <TweetCard
              id={comment._id}
              currentUserId={userId}
              parentId={comment.parentId}
              author={comment.author}
              comments={comment.children}
              likes={comment.likes}
              content={comment.content}
              createdAt={comment.createdAt.toString()}
              isComment={true}
            />
          </div>
        ))
      }
    </div>
  )
}

export default page