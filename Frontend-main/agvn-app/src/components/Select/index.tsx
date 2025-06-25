import React from 'react'

interface CustomSelectProps {
  position: number
  label: string
  options: {
    label: string
    value: string
  }[]
  onClick?: (value: string) => void
}

const CustomSelect = (props: CustomSelectProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {props.position}. {props.label}
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => props.onClick?.(e.target.value)}
      >
        <option value="">Select an option...</option>
        {props.options.map((opt) => (
          <option
            value={opt.value}
            key={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
