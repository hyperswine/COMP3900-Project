'use client'

import React from 'react'
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
      {/* <PageTitle title="Sign Up - AGVN" /> */}
      <Banner title="Sign Up" />
      <div className="max-w-md mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={register}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="driverLicense">
                  Driver License Number *
                </label>
                <input
                  id="driverLicense"
                  type="text"
                  value={driverLicense}
                  onChange={(e) => setDriverLicense(e.target.value)}
                  placeholder="Enter your driver license number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="medicare">
                  Medicare Number *
                </label>
                <input
                  id="medicare"
                  type="text"
                  value={medicare}
                  onChange={(e) => setMedicare(e.target.value)}
                  placeholder="Enter your medicare number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="irn">
                  Individual Reference Number *
                </label>
                <input
                  id="irn"
                  type="text"
                  value={irn}
                  onChange={(e) => setIrn(e.target.value)}
                  placeholder="Enter your individual reference number"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={term}
                  onChange={(e) => setTerm(e.target.checked)}
                  required
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="terms" className="ml-2 text-gray-700">
                  I agree with terms of user and privacy *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors text-lg uppercase"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-bold text-blue-600 hover:text-blue-700">
              Sign in.
            </Link>
          </p>
        </div>
      </div>
      <Popups type="error" message={errorMsg} />
    </Layout>
  )
}
