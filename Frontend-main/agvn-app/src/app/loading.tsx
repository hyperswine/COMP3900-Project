import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mb-4"></div>
      <p className="text-lg text-gray-600">
        Loading...
      </p>
    </div>
  )
}
