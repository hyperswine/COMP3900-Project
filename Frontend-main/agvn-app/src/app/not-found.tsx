import React from 'react'
import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import Layout from '../components/TheLayout'

export default function NotFound() {
  return (
    <Layout>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="70vh"
        textAlign="center"
        p={8}
      >
        <Heading as="h1" size="4xl" mb={4} color="darkBlue">
          404
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Page Not Found
        </Heading>
        <Text fontSize="lg" mb={8} color="text" maxW="500px">
          Sorry, the page you are looking for does not exist.
          It might have been moved, deleted, or you entered the wrong URL.
        </Text>
        <Button as={Link} href="/" colorScheme="blue" size="lg">
          Go Home
        </Button>
      </Flex>
    </Layout>
  )
}
