import React, { useState } from 'react'
import Image from 'next/image'

interface LeftCardProps {
  title: string,
  subtitle?: string,
  content?: string,
  imageUrl?: string,
  backgroundColor?: string,
  moreContent?: string
}

export const assignCards = (cardData: Array<LeftCardProps>) => {
  const checkMoreContent = (cardData: Array<LeftCardProps>) => {
    cardData.forEach(c => {
      if (c.content && c.content.length > 200) {
        c.moreContent = c.content.substr(200)
        c.content = c.content.slice(0, 200)
      }
    })
    return cardData
  }
  return (
    <div className="flex justify-center flex-col items-center p-2">
      {checkMoreContent(cardData).map((c) => (
        <React.Fragment key={c.title}>
          <LeftCard {...c} />
          <div className="h-14" />
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * on click -> expands even more -> rest of the content fades in
 * when content > 200 characters, make 200+ chars as '...'
 * on click, those box expands and the characters come in
 */

function LeftCard({ title, subtitle, content, imageUrl, moreContent }: LeftCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const expandCard = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div
        onClick={expandCard}
        className="card cursor-pointer transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
      >
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {content + (moreContent ? moreContent : "")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between p-9">
          {imageUrl && (
            <div className="max-w-[50%] h-60 relative">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="flex justify-center flex-col">
            <h2 className="text-center mb-8 max-w-[25rem] text-2xl font-bold">{title}</h2>
            <p className="text-xs pl-20 pb-4 text-gray-600">
              {subtitle}
            </p>
            <div className="pl-20">
              <div className="h-px bg-gray-300 transition-all duration-200 hover:w-80 w-40" />
            </div>
            <div className="card-contents max-w-[25rem] pt-10 pl-20 pr-20 text-gray-700">
              {content + (content?.length === 200 ? "..." : "")}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftCard
