import React from "react"
import { Text, Flex, Image, Heading, Divider } from "@chakra-ui/react"
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
      <Banner />
      <Flex direction="column" align="center" justify="center" minH="100vh" p={8}>
        <Heading as="h1" size="2xl" mb={8} textAlign="center" color="darkBlue">
          Welcome to AGVN
        </Heading>
        <Text fontSize="xl" textAlign="center" mb={8} maxW="600px" color="text">
          Your gateway to Australian Government services and citizen engagement
        </Text>

        <Divider mb={8} />

        <Flex wrap="wrap" justify="center" gap={6}>
          {HOME_CARDS.map((card, index) => (
            <div key={index}>
              {assignCards(card)}
            </div>
          ))}
        </Flex>

        <Flex mt={8} align="center" justify="center">
          <Image src={calendar} alt="Calendar" mr={4} />
          <Text fontSize="lg" color="text">
            Stay updated with the latest government initiatives
          </Text>
        </Flex>
      </Flex>
    </Layout>
  )
}
