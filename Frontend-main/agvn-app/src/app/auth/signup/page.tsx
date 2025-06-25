'use client'

import React from 'react'
import { Button, Text, Box, Flex, Input, FormControl, FormLabel, Checkbox, VStack, Container } from '@chakra-ui/react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'
import Popups from '../../../components/Popup'
import PageTitle from '../../../components/PageTitle'
import { Banner } from '../../../components/TheHeader'
import Layout from '../../../components/TheLayout'

const host = 'http://127.0.0.1:8000/api/v1'

export default function SignupPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')
  const [driverLicense, setDriverLicense] = React.useState('')
  const [medicare, setMedicare] = React.useState('')
  const [irn, setIrn] = React.useState('')
  const [term, setTerm] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const cookies = new Cookies()
  const router = useRouter()

  async function register(e: any) {
    e.preventDefault()
    if (term === false) {
      setErrorMsg("You need to accept the terms of user and privacy")
      return
    }
    if (password !== confirmPass) {
      setErrorMsg("Password do not match")
      return
    }
    // regex to check at least 8 character with one lower, upper and special character
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/
    if (password.length < 8 || !regex.test(password)) {
      setErrorMsg("Password must contain at least 8 characters with at least one uppercase, one lowercase letter and one special character")
      return
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMsg("Email must be a valid email address")
      return
    }

    const params = {
      "email": email,
      "password": password,
      "driver_license": driverLicense,
      "medicare": medicare,
      "individual_reference_number": irn
    }

    try {
      const response = await fetch(`${host}/user/register`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        const json = await response.json()
        console.log(json)
        cookies.set('token', json.jwt, { path: '/' })
        router.push('/')
      } else {
        const json = await response.json()
        console.log(json)
        if (json.error) {
          setErrorMsg(json.error)
        } else {
          setErrorMsg("Registration failed. Please try again.")
        }
      }
    } catch (error) {
      setErrorMsg("Network error. Please try again.")
    }
  }

  return (
    <Layout>
      <PageTitle title="Sign Up - AGVN" />
      <Banner title="Sign Up" />
      <Container maxW="md" py={8}>
        <Box bg="white" p={8} rounded="lg" shadow="md">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
            Create Your Account
          </Text>

          <form onSubmit={register}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm your password"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Driver License Number</FormLabel>
                <Input
                  type="text"
                  value={driverLicense}
                  onChange={(e) => setDriverLicense(e.target.value)}
                  placeholder="Enter your driver license number"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Medicare Number</FormLabel>
                <Input
                  type="text"
                  value={medicare}
                  onChange={(e) => setMedicare(e.target.value)}
                  placeholder="Enter your medicare number"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Individual Reference Number</FormLabel>
                <Input
                  type="text"
                  value={irn}
                  onChange={(e) => setIrn(e.target.value)}
                  placeholder="Enter your individual reference number"
                />
              </FormControl>

              <FormControl isRequired>
                <Checkbox
                  isChecked={term}
                  onChange={(e) => setTerm(e.target.checked)}
                >
                  I agree with terms of user and privacy
                </Checkbox>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="full"
                textTransform="uppercase"
              >
                Sign Up
              </Button>
            </VStack>
          </form>

          <Text textAlign="center" mt={6}>
            Already have an account?{' '}
            <Link href="/auth/signin" style={{ fontWeight: 'bold', color: '#3182ce' }}>
              Sign in.
            </Link>
          </Text>
        </Box>
      </Container>
      <Popups type="error" message={errorMsg} />
    </Layout>
  )
}
