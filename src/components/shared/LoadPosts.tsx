"use client"

import { fatchTweets } from '@/lib/actions/tweet.action'
import { Dot, Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import TweetCard from '../cards/TweetCard'
import { fetchUserComments, fetchUserPosts } from '@/lib/actions/user.action'

interface loadPostsProp {
    isNext: boolean,
    currentUserId: string,
    type: "ALL-TWEET" | "REPLY" | "USER-TWEET" | "USER-REPLY",
    uId?: string,
}

function LoadPosts({ isNext, currentUserId, type, uId }: loadPostsProp) {

    const [tweets, setTweets] = useState<any[]>([])
    const [load, setLoad] = useState(isNext)
    const [page, setPage] = useState<number>(2)
    const [ref, inView, entry] = useInView()

    async function fData() {
        if (type === "ALL-TWEET") {
            fatchTweets(page)
                .then((res) => {
                    setLoad(res.isNext)
                    setTweets([...tweets, ...res.posts])
                    setPage((p) => p + 1)
                })
                .catch((e) => {
                    throw e
                })
        }
        else if (type === "USER-TWEET") {
            const res = await fetchUserPosts(uId!,page)
            setLoad(res?.isNext!)
            setTweets([...tweets, ...res?.userPosts])
            setPage((p) => p + 1)
        }
        else if (type === "USER-REPLY") {
            const res = await fetchUserComments(uId!,page)
            setLoad(res?.isNext!)
            setTweets([...tweets, ...res?.userComment])
            setPage((p) => p + 1)
        }
    }

    useEffect(() => {
        if (inView && load && entry?.isIntersecting) {
            fData()
        }
    }, [inView])

    return (
        <div className='flex flex-col gap-4 w-full'>
            {
                tweets.length > 0 && (
                    tweets.map((tweet) => {
                        return (
                            <TweetCard
                                key={tweet._id}
                                id={tweet._id}
                                currentUserId={currentUserId}
                                parentId={tweet.parentId}
                                content={tweet.content}
                                author={tweet.author}
                                createdAt={tweet.createdAt}
                                likes={tweet.likes}
                                comments={tweet.children}
                            />
                        )
                    })
                )
            }
            {
                load ? (
                    <>
                        <div ref={ref} className='grid place-content-center'>
                            <Loader2 className=' animate-spin' />
                        </div>
                    </>
                ) : (
                    <div className='grid place-content-center'>
                        <Dot />
                    </div>
                )
            }
        </div>
    )
}

export default LoadPosts