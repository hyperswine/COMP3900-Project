import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface DownCardProps {
  title: string,
  subtitle?: string,
  content?: string,
  imageUrl?: string,
  directUrl?: string,
  externalUrl?: string,
}

export const assignCards = (cardData: Array<DownCardProps>) => {
  return (
    <div className="flex justify-center flex-row items-center flex-wrap">
      {cardData.map((c) => (
        <div key={c.title} className="m-10 min-w-[30rem]">
          <DownCard {...c} />
        </div>
      ))}
    </div>
  )
}

// TODO? how to make the images take up the entire space?
// Maybe have to use a grid with equal column and row sizes (1/2 col span, 2 rows)

function DownCard({ title, subtitle, content, imageUrl, directUrl, externalUrl }: DownCardProps) {
  return (
    <div
      className="card cursor-pointer transition-all duration-300 hover:scale-105 hover:text-gray-600"
    >
      <Link href={((directUrl ? directUrl : "") || (externalUrl ? externalUrl : ""))}>
        <div className="rounded-none justify-center py-20">
          <h2 className="text-center mb-8 text-xl font-bold">{title}</h2>
          <p className="text-sm pl-20 pb-4 text-gray-600">
            {subtitle}
          </p>
          <div className="pl-20">
            <div className="h-px bg-gray-300 mb-6 transition-all duration-200 hover:w-80 w-40" />
            <div className="flex items-center justify-center">
              {imageUrl && (
                <div className="max-w-[50%] mt-6 mb-6 ml-6 h-20 relative">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DownCard
