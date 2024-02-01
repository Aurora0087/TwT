"use client"

import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Bookmark, Heart, LucideKeyboard, MessageCircle, MoveUp } from 'lucide-react';
import DropDownTweet from '../shared/DropDownTweet';
import { toggelLikeTweet } from '@/lib/actions/tweet.action';


export interface tweetProps {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        username: string;
        avater: string;
        _id: string;
        firstName: string;
        lastName: string;
    };
    likes: {
    }[],
    createdAt: string;
    comments: {
        author: {
            avater: string;
        };
    }[];
    isComment?: boolean;
}

function TweetCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    createdAt,
    likes,
    comments,
    isComment,
}: tweetProps) {
    const isAuthor = currentUserId === author._id
    const [likeCount, setLikeCount] = useState(likes.length)

    const [isLiked, setIsLiked] = useState(likes.find((l)=>l===currentUserId)? true:false)


    async function likeButton() {
        await toggelLikeTweet(id, currentUserId).then((res) => {
            setLikeCount(res.likes.length)
            setIsLiked(res.likes.find((l:string)=>l===currentUserId)? true:false)
        })
    }

    return (
        <div className=' w-full h-fit flex flex-col gap-2 bg-slate-500/10 p-6 rounded-t-xl relative'>
            {isAuthor && (
                <>
                    <div className=' absolute top-2 right-4'>
                        <DropDownTweet isAuthor={isAuthor} tweetId={id} />
                    </div>
                </>
            )}
            { parentId?.length! > 0 && <Link href={`/tweet/${parentId}`} className=' text-sm text-slate-500 flex hover:text-slate-100 w-fit'>
                <MoveUp height={15}/>replied to
            </Link>}
            <div className='flex items-start'>
                <div className='flex gap-6'>
                    <Link href={`/profile/${author._id}`} className=' overflow-hidden w-fit h-fit rounded-full'>
                        <Image
                            src={author.avater}
                            alt=''
                            width={32}
                            height={32}
                        />
                    </Link>
                    <div className='flex flex-col gap-2 overflow-hidden'>
                        <div className='flex gap-2 items-center'>
                            <p className=' font-semibold'>{`${author.firstName} ${author.lastName}`}</p>
                            <Link href={`/profile/${author._id}`} className=' text-slate-400 '>{`@${author.username}`}</Link>
                            ·
                            <p className=' text-sm'>{createdAt}</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link href={`/tweet/${id}`} className=' w-fit line-clamp-6'>
                                <pre className=''>
                                    {content}
                                </pre>
                            </Link>
                            <div className='flex justify-between'>
                                <Link href={`/tweet/${id}`} className='flex items-center text-white cursor-pointer hover:text-blue-500'>
                                    <MessageCircle className='hover:text-blue-500' />
                                    {comments.length}
                                </Link>
                                <button onClick={()=>{likeButton()}} className='flex gap-1 items-center text-white cursor-pointer hover:text-red-500'>
                                    <Heart className={`${isLiked && "text-red-500"}`} />
                                    {likeCount}
                                </button>
                                <button className=' hover:text-purple-500'>
                                    <Bookmark/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCard