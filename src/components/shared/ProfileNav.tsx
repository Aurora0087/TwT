"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const pNav = [
    {
        title: "posts",
        routh: ""
    },
    {
        title: "replies",
        routh: "/replies"
    },
    {
        title: "likes",
        routh: "/likes"
    },
    {
        title: "media",
        routh: "/media"
    },
    {
        title: "saved",
        routh: "/saved"
    },
]

function ProfileNav({id}:{id:string}) {
    const pathname = usePathname();
    return (
        <div className='flex justify-between w-full border-b'>
            {pNav.map((data) => {
                return (
                    <Link key={data.title} href={`/profile/${id}/${data.routh}`} className=' hover:bg-slate-500/10 rounded-lg w-full grid place-content-center px-4 py-2 capitalize'>
                        <span className={`w-fit pb-2 px-1 sm:px-2 border-b-4 ${(pathname)===`/profile/${id+data.routh}` ? ( " border-blue-500"):(" border-transparent")}`}>{data.title}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default ProfileNav