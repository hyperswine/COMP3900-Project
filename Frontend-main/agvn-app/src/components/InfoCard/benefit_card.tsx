import React from 'react'
import Image from 'next/image'

export interface BenefitCardProps {
  title: string,
  threshold: number,
  content?: string,
  imageUrl?: string,
  imageUrl2?: string
}

export default function assignCards(cardData: Array<BenefitCardProps>) {
  return (
    <div className="flex justify-center flex-row items-center flex-wrap">
      {cardData.map((c) => (
        <div key={c.title} className="m-10 min-w-[50rem]">
          <BenefitCard {...c} />
        </div>
      ))}
    </div>
  )
}

/**
 * TODO -> onClick, expand the card and place 'content' into view.
 * Basically, create a box out of view with all the title, threshold, content... with custom styling
 * Then fade in from below as a dialog
 * If click out of the box, then close it
 */
function DialogBox({ title, threshold, content, imageUrl, imageUrl2 }: BenefitCardProps) {
  return (
    <div className="w-[90vw]">
      <p className="text-xl pl-20 pb-4">
        Threshold: {threshold} Contribution
      </p>
      <div className="pl-20">
        <div className="flex items-center justify-center">
          {imageUrl && (
            <div className="max-w-[50%] mt-6 mb-6 ml-6 h-20 relative">
              <Image src={imageUrl} alt="Benefit" fill className="object-contain" />
            </div>
          )}
          {imageUrl2 && (
            <div className="max-w-[50%] mt-6 mb-6 ml-6 h-20 relative">
              <Image src={imageUrl2} alt="Benefit" fill className="object-contain" />
            </div>
          )}
        </div>
      </div>
      <div className="p-20">
        <p className="text-gray-700">{content}</p>
      </div>
      <h2 className="text-center mb-8 text-2xl font-bold">{title}</h2>
    </div>
  )
}

function BenefitCard({ title, threshold, content, imageUrl, imageUrl2 }: BenefitCardProps) {
  return (
    <div
      className="card cursor-pointer transition-all duration-300 hover:scale-105 hover:text-green-600"
    >
      <div className="rounded-none justify-center pb-12 bg-[#afc6c7]">
        <p className="text-sm m-4 text-center">
          Threshold: {threshold} Contribution
        </p>
        <div>
          <div className="flex items-center justify-center">
            {imageUrl && (
              <div className="max-w-[50%] mt-6 mb-6 ml-6 h-20 relative">
                <Image src={imageUrl} alt="Benefit" fill className="object-contain" />
              </div>
            )}
            {imageUrl2 && (
              <div className="max-w-[50%] mt-6 mb-6 ml-6 h-20 relative">
                <Image src={imageUrl2} alt="Benefit" fill className="object-contain" />
              </div>
            )}
          </div>
        </div>
        <h2 className="text-center mb-8 text-xl font-bold">{title}</h2>
      </div>
    </div>
  )
}
