import React from 'react'
import { range } from 'lodash'

interface Props {
    position: number
    label: string
    options: string[]
    values?: { [key: string]: number }
    onChange?: (option: string, value: number) => void
}

const PoorToGood = ({ position, label, options, values = {}, onChange }: Props) => {
    const scaleLabels = ['Highly Unfavorable', 'Unfavorable', 'Neutral', 'Favorable', 'Highly Favorable']

    return (
        <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-4">
                {position}. {label}
            </p>
            <div className="flex justify-between w-4/5 ml-[20%] mb-2 text-sm text-gray-600">
                {scaleLabels.map((label, index) => (
                    <span key={index}>{label}</span>
                ))}
            </div>
            {options.map((opt, optIndex) => (
                <div key={optIndex} className="flex justify-between items-center mb-3">
                    <span className="w-1/5 text-gray-700">{opt}</span>
                    <div className="flex justify-between w-4/5">
                        {range(1, 6).map((num) => (
                            <label key={num} className="flex items-center">
                                <input
                                    type="radio"
                                    name={`${position}-${opt}`}
                                    value={num - 4}
                                    checked={values[opt] === num - 4}
                                    onChange={(e) => onChange?.(opt, parseInt(e.target.value))}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                />
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PoorToGood
