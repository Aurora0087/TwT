import { auth } from '@clerk/nextjs'
import React from 'react'

async function page({ params }: { params: { id: string } }) {

    const { sessionClaims } = auth()

    const userId = sessionClaims?.userId as string
    return (
        <div>
            yo
        </div>
    )
}

export default page