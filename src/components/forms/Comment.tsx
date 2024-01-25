'use client'

import Image from 'next/image'
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addCommentToTweet } from '@/lib/actions/tweet.action'
import { Toaster } from '../ui/toaster'
import { useToast } from '../ui/use-toast'

const formSchema = z.object({
    content: z.string().min(1, {
        message: "comment must be at least 1 characters.",
    }),
})

type commentProp = {
    tweetId: string,
    currentUserId: string,
    currentUserImg: string,
}

function Comment({ tweetId, currentUserId, currentUserImg }: commentProp) {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await addCommentToTweet(
            tweetId,
            values.content,
            currentUserId,
            )
            toast({
                title: "Done",
                description: "Comment posted.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: `${error}`,
            })
        }
        
    }

    return (
        <div className=' py-4 px-6 flex gap-4 items-center'>
            <div className=' overflow-hidden rounded-full'>
                <Image
                    src={currentUserImg}
                    alt=''
                    width={32}
                    height={32}
                />
            </div>
            <div className='flex flex-grow'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex gap-4 w-full text-stone-900">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className=' w-full'>
                                    <FormControl>
                                        <Input placeholder="Post ur reply" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={form.getValues().content === '' || form.formState.isSubmitting} type="submit">Post</Button>
                    </form>
                </Form>
            </div>
            <Toaster />
        </div>
    )
}

export default Comment