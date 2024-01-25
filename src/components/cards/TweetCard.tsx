import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { Heart, MessageCircle} from 'lucide-react';

interface tweetProps {
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
    return (
        <div className=' w-full h-fit bg-slate-500/10 p-6 rounded-t-xl'>
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
                            <span className=' font-semibold'>{`${author.firstName} ${author.lastName}`}</span>
                            <Link href={`/profile/${author._id}`} className=' text-slate-400 '>{`@${author.username}`}</Link>
                            ·
                            <span className=' text-sm'>{formatDateString(createdAt)}</span>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link href={`/tweet/${id}`} className=' w-fit line-clamp-6'>
                                <pre className=''>
                                    {content}
                                </pre>
                            </Link>
                            <div className='flex justify-between'>
                                <Link href={`/tweet/${id}`} className='flex items-center text-white cursor-pointer'>
                                    <MessageCircle className='hover:text-blue-500' />
                                    {comments.length}
                                </Link>
                                <span className='flex gap-1 items-center text-white cursor-pointer'>
                                    <Heart className='hover:text-red-500' />
                                    {likes.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetCard