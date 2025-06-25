import React from 'react'
import { range } from 'lodash'

interface HowLikelyProps {
    position: number
    label: string
    onClick: (value: number) => void
    start: number
    end: number
    selectedValue?: number
}

const HowLikely: React.FC<HowLikelyProps> = ({
    position,
    label,
    onClick,
    start,
    end,
    selectedValue,
    ...props
}) => {
    return (
        <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3">
                {position}. {label}
            </p>
            <div className="flex justify-between w-[400px] mb-2 text-sm text-gray-600">
                <span>Not at all Likely</span>
                <span>Extremely Likely</span>
            </div>
            <div className="flex">
                {range(start, end).map((num) => (
                    <button
                        key={num}
                        onClick={() => onClick(num)}
                        className={`w-10 h-10 border border-black text-center font-medium transition-colors ${
                            selectedValue === num
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-black hover:bg-gray-100'
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default HowLikely
