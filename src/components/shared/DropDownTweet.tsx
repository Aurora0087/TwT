"use client"

import React from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { MoreHorizontal } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { deleteTweetById } from '@/lib/actions/tweet.action'
import Link from 'next/link'

function DropDownTweet({ isAuthor, tweetId }: { isAuthor: boolean, tweetId: string }) {

    const { toast } = useToast()

    async function deleteTweet(id: string) {
        try {
            if (!isAuthor) {
                toast({
                    variant: "destructive",
                    title: "unauthorized",
                    description: "U are not authorized to delete this post.",
                })
                return
            }
            if (isAuthor && id.length > 0) {
                await deleteTweetById(id)
                toast({
                    title: "Done",
                    description: "Tweet deleted.",
                })
            }
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `${error}`,
            })
        }
    }

    return (
        <>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger className=' rounded-full hover:bg-slate-50 p-1'>
                        <div className=''>
                            <MoreHorizontal className='hover:text-slate-900' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <span className=' text-red-500'>
                                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className=' text-slate-900'>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this Tweet/Comment.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className=' text-slate-900'>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteTweet(tweetId)} className=' bg-red-500 hover:bg-red-500/80'>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </>

    )
}

export default DropDownTweet