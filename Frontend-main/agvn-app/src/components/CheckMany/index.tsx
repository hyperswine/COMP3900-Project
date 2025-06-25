import React from 'react'

interface Props {
    position: number
    label: string
    options: string[]
    value?: string[]
    onChange?: (values: string[]) => void
}

const CheckMany = ({ position, label, options, value = [], onChange }: Props) => {
    const handleChange = (option: string, checked: boolean) => {
        if (onChange) {
            if (checked) {
                onChange([...value, option])
            } else {
                onChange(value.filter(v => v !== option))
            }
        }
    }

    return (
        <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3">
                {position}. {label}
            </p>
            <div className="space-y-2">
                {options.map((opt, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id={`${position}-${index}`}
                            checked={value.includes(opt)}
                            onChange={(e) => handleChange(opt, e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor={`${position}-${index}`} className="text-gray-700">
                            {opt}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CheckMany
