import React from "react"
import Image from "next/image"
import { Banner } from '../../components/TheHeader'
import Layout from '../../components/TheLayout'

export default function AboutPage() {
  return (
    <Layout>
      <Banner title="About A-GVN" quote="Don't call us, we'll call you" author="Hollywood Principle" />
      <div className="m-16 flex flex-col">
        <div className="voting-container flex justify-center items-center flex-col mb-20">
          <h1 className="text-center mb-4 text-3xl font-bold">A-GVN System</h1>
          <div className="w-1/2 h-px bg-gray-300 mb-4" />
          <div className="flex items-center justify-center mb-4 max-w-[70%]">
            <p className="m-10 w-[65%] text-gray-700 leading-relaxed">
              The Automatic Governing System (A-GVN) is the next step in governing our society.
              Moving on from poor, inefficient and outdated methods of leadership and evaluation of your desires,
              we are presenting an answer to these problems in the form of a highly efficient,
              highly scalable, extensible and portable software system.
            </p>
            <div className="w-[35%] relative h-48">
              <Image
                src="/assets/AGVN_logos/AGVN.png"
                alt="AGVN Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="contribution-container flex justify-center items-center flex-col mb-20">
          <div className="flex items-center justify-center mb-4 max-w-[70%]">
            <p className="m-10 w-[65%] text-gray-700 leading-relaxed">
              Using A-GVN you can learn about the various initiatives you may choose to support,
              vote for your chose initiative, boost your Contribution Score by completing surveys,
              view the results from a previous voting cycle and more.
            </p>
            <div className="w-[35%] relative h-48">
              <Image
                src="/assets/voteInitiatives.png"
                alt="Vote Initiatives"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="ml-40 text-xs text-gray-600">
            If you wish to learn more, feel free to talk to our chatbot on the bottom right.
            It will answer all of your concerns. If you still have more questions,
            contact us at admin@agvn.info.
          </p>
        </div>
      </div>
    </Layout>
  )
}
