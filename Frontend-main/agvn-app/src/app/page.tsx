import React from "react"
import { assignCards, DownCardProps } from "../components/InfoCard/down_card"
import { Banner } from "../components/TheHeader"
import Layout from "../components/TheLayout"

// Import using public path for app router
const calendar = "/assets/Images/calendar.png"
const actions = "/assets/HomeScreen_icons/Actions.png"
const department = "/assets/HomeScreen_icons/Department.png"
const policy = "/assets/HomeScreen_icons/Policy.png"
const aeros = "/assets/aeros_logo.png"

const HOME_CARDS: Array<DownCardProps> = [
  {
    title: "Current Policies",
    imageUrl: policy,
    directUrl: '/policies'
  },
  {
    title: "Actions we're taking",
    imageUrl: actions,
    directUrl: '/actions'
  },
  {
    title: "Our Departments",
    imageUrl: department,
    directUrl: '/departments'
  },
  {
    title: "Aeros (G-Coin)",
    imageUrl: aeros,
    directUrl: '/aeros'
  }
]

export default function HomePage() {
  return (
    <Layout>
      <Banner title="Welcome to AGVN" subtitle="Australian Government Virtual Network" />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-5xl font-bold mb-8 text-center text-dark-blue">
          Welcome to AGVN
        </h1>
        <p className="text-xl text-center mb-8 max-w-2xl text-gray-600">
          Your gateway to Australian Government services and citizen engagement.
          Participate in democracy, stay informed, and make your voice heard.
        </p>

        <hr className="w-full mb-8 border-gray-300" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {HOME_CARDS.map((card, index) => (
            <div key={index}>
              {assignCards(card)}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-8">
          <img src={calendar} alt="Calendar" className="mr-4 w-8 h-8" />
          <p className="text-lg text-gray-600">
            Stay updated with the latest government initiatives
          </p>
        </div>
      </div>
    </Layout>
  )
}
