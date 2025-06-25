import React, { Component } from "react"

interface PageTitleProps {
  title: string
  subtitle?: string
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  return (
    <div className="text-black col-start-3 col-end-[-1]">
      <h3 className="text-center text-4xl text-black">
        {title}
      </h3>
      <p className="text-center text-3xl mt-4">
        {subtitle}
      </p>
    </div>
  )
}

export default PageTitle
