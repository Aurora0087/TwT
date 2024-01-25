"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"


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
import { Textarea } from '../ui/textarea'
import { createTweet } from '@/lib/actions/tweet.action'

type tweetFormParam = {
    userId: string,
    type: "CREATE" | "EDIT" | "COMMENT"

}

const formSchema = z.object({
    content: z.string().min(1, '').max(500),
})

function PostTwitt({ userId, type }: tweetFormParam) {

    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        if (type === "CREATE") {
            try {
                const res = await createTweet({
                    userId,
                    content:values.content,
                })
                console.log(res)
                if (res) {
                    toast({
                        title: "Done",
                        description: "Tweet posted.",
                    })
                    form.reset()
                }
            } catch (error) {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: `${error}`,
                })
            }
        }
    }

    return (
        <div className=' p-6 py-10 w-full h-full flex flex-col items-center'>
            <div className=' bg-slate-500/10 p-10 rounded-3xl w-full'>
                <h3 className=' w-fit text-3xl font-semibold uppercase mb-6'>
                    {`${type} `}tweet
                </h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 text-slate-900">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="What is happening?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={form.getValues().content === '' || form.formState.isSubmitting} type="submit">{`${type} `}POST</Button>
                    </form>
                </Form>
            </div>
            <Toaster />
        </div>
    )
}

export default PostTwitt