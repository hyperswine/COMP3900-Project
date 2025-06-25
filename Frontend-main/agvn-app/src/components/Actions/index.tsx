import React, { useState } from 'react'
import Image from 'next/image'

export interface ActionProp {
  heading: string
  content: string
  imgUrl?: string
  current?: boolean
}

function Action({ heading, content, imgUrl, current = true }: ActionProp) {
  const [isCurrent, setCurrent] = useState(true)

  return (
    <div className="mb-40 flex flex-col justify-center items-center">
      <h2 className="mb-8 text-center text-2xl font-bold">{heading}</h2>
      {imgUrl && (
        <div className="mb-4 relative w-full max-w-md h-64">
          <Image
            src={imgUrl}
            alt={heading}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <div className="social-media"></div>
      <div>
        <p className={`text-center text-base mb-8 font-medium ${current ? "text-red-600" : "text-green-600"}`}>
          {current ? "Action being undertaken" : "Action has been taken"}
        </p>
        <p className="text-left text-xl pl-16 pr-16 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  )
}

export function assignActions(actions: Array<ActionProp>) {
  return (
    <div className="m-16 flex flex-col p-16">
      {actions.map((a) => (
        <Action {...a} key={a.heading} />
      ))}
    </div>
  )
}

export default assignActions
