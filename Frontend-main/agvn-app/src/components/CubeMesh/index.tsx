'use client'

import React, { useState } from 'react'

const Cube = (props: any) => {
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    return (
        <div
            {...props}
            className={`
                w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700
                rounded-lg shadow-lg cursor-pointer transition-all duration-300
                transform-gpu animate-spin-slow
                ${active ? 'scale-150' : 'scale-100'}
                ${hovered ? 'bg-gradient-to-br from-gray-800 to-black shadow-2xl' : ''}
            `}
            onClick={() => setActive(!active)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
                3D
            </div>
        </div>
    )
}

function CubeCanvas() {
    return (
        <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <Cube />
        </div>
    )
}

export default CubeCanvas
