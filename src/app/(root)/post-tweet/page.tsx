import PostTwitt from '@/components/forms/PostTwitt'
import { auth } from '@clerk/nextjs'
import React from 'react'

function postTweetPage() {
  const { sessionClaims } = auth()
    
  const userId = sessionClaims?.userId as string
  console.log(userId)
  return (
    <div className='flex flex-col justify-center'>
      <PostTwitt userId={userId} type={"CREATE"} />
    </div>
  )
}

export default postTweetPage