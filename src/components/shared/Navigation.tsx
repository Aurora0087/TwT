'use client'

import React from 'react'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import { Home, LogIn, LogOut, User } from 'lucide-react';

function Navigation({currentUser}:{currentUser:string}) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <section className=' flex flex-col gap-10 h-full items-center w-fit py-6'>
            <div className=' flex flex-col gap-4 items-center justify-between w-full flex-grow'>
                {
                    sidebarLinks.map((link) => {
                        const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
                        return (
                            <Link href={link.route}
                                key={link.label}
                                className={`flex gap-2 items-center whitespace-nowrap rounded-full hover:bg-slate-50/5 p-1 md:p-3 w-full ${isActive && " text-blue-500"}`}>
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={20}
                                    height={20}
                                />
                                <p className=' hidden lg:flex'>
                                    {link.label}
                                </p>
                            </Link>
                        )
                    })
                }
                <SignedIn>
                    <Link href={`/profile/${currentUser}`}>
                    <User/>
                    </Link>
                </SignedIn>
                <SignedOut>
                    <Link href='/sign-in' >
                        <div className='flex gap-2 cursor-pointer hover:text-slate-50/80'>
                            <LogIn />
                            <p className=' hidden lg:flex'>Log In</p>
                        </div>
                    </Link>
                </SignedOut>
            </div>
        </section>
    )
}

export default Navigation