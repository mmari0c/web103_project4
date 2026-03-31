import React from 'react'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1 className='text-2xl font-bold'>Fit Builder </h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize</a></li>
                <li><a href='/outfits' role='button'>View Outfits</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
