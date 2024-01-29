import React from 'react'
import Navigation from './Navigation'
import { auth } from '@clerk/nextjs'

function Leftside() {

    const { sessionClaims } = auth()

    const currentUserId = sessionClaims?.userId as string
    
    return (
        <header className=' relative justify-end lg:flex-grow md:min-w-[150px] hidden sm:flex'>
            <div className=' sticky top-0 h-screen px-4  border-r-[.5px] border-white border-opacity-50 overflow-auto'>
                <Navigation currentUser={currentUserId} />
            </div>
        </header>
    )
}

export default Leftside