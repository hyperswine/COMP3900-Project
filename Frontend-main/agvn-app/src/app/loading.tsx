import React from 'react'
import { Flex, Spinner, Text } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mb={4}
      />
      <Text fontSize="lg" color="gray.600">
        Loading...
      </Text>
    </Flex>
  )
}
