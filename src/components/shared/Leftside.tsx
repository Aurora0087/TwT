import React from 'react'
import Navigation from './Navigation'

function Leftside() {
    return (
        <header className=' relative justify-end lg:flex-grow md:min-w-[150px] hidden sm:flex'>
            <div className=' sticky top-0 h-screen px-4  border-r-[.5px] border-white border-opacity-50 overflow-auto'>
                <Navigation/>
            </div>
        </header>
    )
}

export default Leftside