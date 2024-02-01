import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { formatDateString } from '@/lib/utils'
import { SignOutButton } from '@clerk/nextjs'

type profileCardProp = {
    uId: string,
    username: string
    firstName: string
    lastName: string
    avater: string
    profilebg?: string
    bio?: string
    followers: string[]
    following: string[]
    tweetes: string[]
    likedtweet: string[]
    isAuther?: boolean
    joined: string
}

function ProfileCard(
    {
        uId,
        username,
        firstName,
        lastName,
        avater,
        profilebg,
        bio,
        followers,
        following,
        tweetes,
        likedtweet,
        isAuther,
        joined,
    }: profileCardProp
) {
    return (
        <div className=' flex flex-col w-full'>
            <div className='flex flex-col relative w-full'>
                <div className="w-full h-[200px] bg-blue-500 rounded-t-lg overflow-hidden object-cover">
                    {profilebg && <Image
                        src={profilebg}
                        alt='bg'
                        width={1000}
                        height={1000}
                    />}
                </div>
                <div className=' h-[100px] relative flex flex-col px-6'>
                    <div className=' h-20 flex justify-end py-6'>
                        {isAuther &&
                            <div className=' flex gap-2'>
                            <Link href={`/profile/${uId}/edit`}>
                                <Button variant={"outline"} className=' bg-inherit rounded-full capitalize'>
                            edit profile
                            </Button>
                            </Link>
                            <SignOutButton>
                                <Button variant={"destructive"} className=' rounded-full'>
                                    Log Out
                                </Button>
                            </SignOutButton>
                            </div>
                            }
                    </div>
                    <div className=' absolute top-[-50px] left-6 rounded-full overflow-hidden w-fit border-2 border-transparent hover:border-green-500'>
                        <Image
                            src={avater}
                            alt='user-avater'
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 px-6 pb-6'>
                        <p className=' font-bold'>{`${firstName} ${lastName}`}</p>
                        <span className=' text-slate-500'>{`@${username}`}</span>
                        {bio && (
                            <pre className=' p-4'>{bio}</pre>
                        )}
                        <div className=' text-slate-500 flex gap-2'><CalendarDays /><span>{`joined ${formatDateString(joined)}`}</span></div>
                        <div className='flex gap-4 capitalize'>
                            <p className='flex gap-2'>
                                <span>{followers.length}</span>
                                <span className=' text-slate-500'>followers</span>
                            </p>
                            <p className='flex gap-2'>
                                <span>{following.length}</span>
                                <span className=' text-slate-500'>following</span>
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProfileCard