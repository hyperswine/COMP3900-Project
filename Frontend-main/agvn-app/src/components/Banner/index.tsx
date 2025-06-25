import React from 'react'

interface BannerProps {
  title: string
  subtitle: string
  quote: string
  author: string
}

const Banner = (props: BannerProps) => {
  return (
    <div className="flex justify-between items-center bg-[#282A2B] w-full h-[310px] text-[#D3D3D3] px-[15%]">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl">{props.title}</h2>
        <div className="bg-[#D3D3D3] h-px w-1/2 my-4" />
        <p className="text-xl text-center">
          {props.subtitle}
        </p>
      </div>
      <div className="max-w-[60%]">
        <p className="text-3xl">{props.quote}</p>
        <p className="text-xl text-center">
          -{props.author}
        </p>
      </div>
    </div>
  )
}

export default Banner
