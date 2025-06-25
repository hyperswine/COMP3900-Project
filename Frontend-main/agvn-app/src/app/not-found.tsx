import React from 'react'
import Link from 'next/link'
import Layout from '../components/TheLayout'
import CubeCanvas from "../components/CubeMesh"

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
              <h1 className="text-6xl font-bold mb-4 text-dark-blue">
                404
              </h1>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Page Not Found
              </h2>
              <p className="text-lg mb-8 text-gray-600 max-w-md">
                Sorry, the page you are looking for does not exist.
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go Home
              </Link>
            </div>
          </div>
          <div className="w-96 h-96 opacity-50">
            <CubeCanvas />
          </div>
        </div>
      </div>
    </Layout>
  )
}
