import React from 'react'
import Navigation from './Navigation'

function Leftside() {
    return (
        <header className='h-screen justify-end lg:flex-grow md:min-w-[150px] hidden sm:flex border-r-[.5px] border-white border-opacity-50 overflow-auto'>
            <div className=' h-fit px-4'>
                <Navigation/>
            </div>
        </header>
    )
}

export default Leftside