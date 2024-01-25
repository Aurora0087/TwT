import { auth } from '@clerk/nextjs'
import React from 'react'

function profilePage() {
    const { sessionClaims } = auth()
    
    const userId = sessionClaims?.userId as string
    console.log(userId)
    return (
        <div>profilePage</div>
    )
}

export default profilePage