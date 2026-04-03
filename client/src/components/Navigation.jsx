import React from 'react'

const Navigation = () => {
    return (
        <nav className='flex justify-between items-center p-4 border-b-2 border-gray-100'>
            <ul>
                <li><a href='/' role='button'><h1 className='text-2xl font-bold'>Fit Builder </h1></a></li>
            </ul>
            <ul>
                <li className='p-2 rounded-lg'><a href='/outfits' role='button'>View Fits</a></li>
            </ul>
        </nav>
    )
}

export default Navigation
