"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { MoveLeft } from 'lucide-react'

function BackButton() {
    const router = useRouter()
    return (
        <div className=' w-full flex px-4 py-2'>
            <Button variant={"ghost"} onClick={()=>router.back()} className=' hover-move rounded-full px-6'>
                <MoveLeft className=' left'/>
            </Button>
        </div>
    )
}

export default BackButton