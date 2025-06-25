import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function TheFooter() {
  return (
    <footer className="bg-blue-900 text-white pt-4 mt-4">
      <div className="container mx-auto px-4 mt-5 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="mb-3">
            <h5 className="text-white uppercase font-bold text-lg mb-4">
              Meta
            </h5>
            <hr className="w-15 h-0.5 bg-blue-300 mb-4 mt-0" />
            <div className="space-y-2">
              <p><Link href="/about" className="text-gray-300 hover:text-white">About</Link></p>
              <p className="text-gray-300">Contact us</p>
              <p className="text-gray-300">Need help?</p>
              <p className="text-gray-300">Translator</p>
            </div>
          </div>

          <div className="mb-3">
            <h5 className="text-white uppercase font-bold text-lg mb-4">
              Terms
            </h5>
            <hr className="w-15 h-0.5 bg-blue-300 mb-4 mt-0" />
            <div className="space-y-2">
              <p className="text-gray-300">Privacy</p>
              <p className="text-gray-300">Terms of use</p>
              <p className="text-gray-300">SMS</p>
              <p className="text-gray-300">Complaints</p>
            </div>
          </div>

          <div className="mb-3">
            <h5 className="text-white uppercase font-bold text-lg mb-4">
              Usage
            </h5>
            <hr className="w-15 h-0.5 bg-blue-300 mb-4 mt-0" />
            <div className="space-y-2">
              <p className="text-gray-300">Email: agvn@agvn.info</p>
              <p className="text-gray-300">Report fraud</p>
              <p className="text-gray-300">Social media</p>
              <p className="text-gray-300">News articles</p>
            </div>
          </div>

          <div className="mb-3 text-center md:text-center">
            <div className="mb-4">
              <Image
                src="/assets/AGVN_white_transparent.png"
                width={137}
                height={280}
                alt="AGVN Logo"
                className="cursor-pointer mx-auto"
              />
            </div>
            <h5 className="text-white uppercase mb-4 font-bold text-sm">
              The future has never been so great
            </h5>
          </div>
        </div>
      </div>

      <div className="bg-blue-950 text-center py-3">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} Copyright: <a href="#" className="text-blue-300 hover:text-white"> AGVN System </a>
        </div>
      </div>
    </footer>
  )
}
