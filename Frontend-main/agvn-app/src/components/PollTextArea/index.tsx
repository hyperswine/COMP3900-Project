import React from 'react'

interface PollTextAreaProps {
    number: number
    label: string
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    rows?: number
    className?: string
}

const PollTextArea: React.FC<PollTextAreaProps> = ({
    number,
    label,
    value,
    onChange,
    placeholder,
    rows = 4,
    className = '',
    ...props
}) => {
    return (
        <div className={`mb-6 ${className}`}>
            <label className="block text-gray-700 font-medium mb-2">
                {number}. {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
        </div>
    )
}

export default PollTextArea
