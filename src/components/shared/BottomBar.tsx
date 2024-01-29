import { SignedIn, SignedOut, auth } from '@clerk/nextjs'
import { Home, LogIn, Search, Send, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function BottomBar() {

    const { sessionClaims } = auth()

    const currentUserId = sessionClaims?.userId as string
    return (
        <div className=' w-screen sticky bottom-0 p-3 grid sm:hidden border-t border-slate-50/50 bg-slate-50/10 backdrop-blur-sm'>
            <div className=' flex justify-between px-2'>
                <Link href="/" className=' p-2 rounded-full hover:bg-slate-500'>
                    <Home/>
                </Link>
                <Link href="/post-tweet" className=' p-2 rounded-full hover:bg-slate-500'>
                    <Send/>
                </Link>
                <Link href="/search" className=' p-2 rounded-full hover:bg-slate-500'>
                    <Search/>
                </Link>
                <SignedIn>
                    <Link href={`/profile/${currentUserId}`} className=' p-2 rounded-full hover:bg-slate-500'>
                    <User/>
                </Link>
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in" className=' p-2 rounded-full hover:bg-slate-500'>
                        <LogIn/>
                    </Link>
                </SignedOut>
            </div>
        </div>
    )
}

export default BottomBar