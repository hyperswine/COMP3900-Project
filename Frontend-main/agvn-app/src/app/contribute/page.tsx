'use client';

import React, { useState } from 'react'
import { AiFillQuestionCircle } from "react-icons/ai"
import assignCards, { BenefitCardProps } from '../../components/InfoCard/benefit_card'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Banner } from '../../components/TheHeader'
import Layout from '../../components/TheLayout'

// Use public path for app router
const grant = '/assets/ContributionScreen_icons/grant.png'
const localCandidate = '/assets/ContributionScreen_icons/local_candidate.jpg'
const sponsorship = '/assets/ContributionScreen_icons/sponsorship.png'
const subsidy = '/assets/ContributionScreen_icons/subsidy.png'
const stateCandidate = '/assets/ContributionScreen_icons/state_candidate.jpg'

const behavioralUrl = 'http://localhost:8200/behavioral/'

interface ErrorInterface {
  title: string
  body?: string
}

function VContributionDialog({ show, onHide }: { show: boolean, onHide: () => void }) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onHide}>
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900 mr-4">
              What is my Contribution Index?
            </h3>
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <button onClick={onHide} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-2 px-7 py-3">
          <p className="text-gray-700">
            Your contribution index shows how much you've taken part in your community.
            The more you contribute through volunteering, donations, and civic engagement,
            the higher your score. This helps us understand how active citizens are in
            making their communities better.
          </p>
          <p className="text-gray-700 mt-4">
            Benefits are awarded based on your contribution tier, encouraging active
            participation in democratic processes and community building.
          </p>
        </div>
      </div>
    </div>
  )
}

const goodLabels = ['contributing', 'engaged', 'active', 'helpful']

export default function ContributePage() {
  const cookies = new Cookies()
  const [auth, setAuth] = React.useState(false)
  const [contributionScore, setContributionScore] = React.useState(0)
  const [contributionTier, setContributionTier] = React.useState('Bronze')
  const [show, setShow] = React.useState(false)
  const [analyzed, setAnalyzed] = React.useState(0) // 0: not analyzed, 1: analyzing, 2: good, 3: bad
  const [encodedFile, setEncodedFile] = React.useState<string | null | ArrayBuffer>(null)
  const [errorMsg, setErrorMsg] = React.useState<ErrorInterface>({ title: "", body: "" })
  const [showErrDialog, setShowErrDialog] = React.useState(false)

  React.useEffect(() => {
    setAuth(cookies.get('token') ? true : false)
    if (cookies.get('token')) {
      // Simulate getting user contribution data
      setContributionScore(75)
      setContributionTier('Silver')
    }
  }, [])

  function handleShowContribution() {
    setShow(true)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setEncodedFile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit() {
    if (encodedFile) {
      setAnalyzed(1)
      try {
        const response = await axios.post(behavioralUrl, { "image": encodedFile }, {
          headers: { 'Content-Type': 'application/json' }
        })
        let x = response.data.label
        console.log(x)
        setAnalyzed(goodLabels.includes(x) ? 2 : 3)
      } catch (err) {
        console.log(err)
        setAnalyzed(3)
      }
    } else {
      setErrorMsg({ title: 'Please specify an image.' })
      setShowErrDialog(true)
    }
  }

  const getAnalysisIcon = () => {
    switch (analyzed) {
      case 1:
        return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      case 2:
        return (
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 3:
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  const BENEFIT_CARDS: Array<BenefitCardProps> = [
    {
      title: "Education Grant",
      threshold: 10,
      imageUrl: grant
    },
    {
      title: "Local Candidate Support",
      threshold: 20,
      imageUrl: localCandidate
    },
    {
      title: "Business Sponsorship",
      threshold: 30,
      imageUrl: sponsorship
    },
    {
      title: "Housing Subsidy",
      threshold: 40,
      imageUrl: subsidy
    },
    {
      title: "State Candidate Support",
      threshold: 50,
      imageUrl: stateCandidate
    }
  ]

  const noLoginContainer = (
    <div className="flex flex-col justify-center items-center mb-20">
      <h1 className="text-center mb-4 mt-10 text-4xl font-bold">Login to see your contribution!</h1>
      <p className="text-xs text-gray-600">Note: Contribution is a benefit only scheme, meaning you will only gain benefits by participating!</p>
    </div>
  )

  const loginContainer = (
    <div className="flex flex-col justify-center items-center mb-20">
      <VContributionDialog show={show} onHide={() => setShow(false)} />

      <h1 className="text-center mb-4 text-3xl font-bold">Your Contribution</h1>
      <hr className="w-1/2 mb-8" />

      <div className="flex flex-row items-center justify-center mb-4 bg-gray-300 p-8 rounded-lg">
        <div className="flex flex-col m-8">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Contribution</label>
            <input
              type="text"
              value={contributionScore}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Contribution Tier</label>
            <input
              type="text"
              value={contributionTier}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col items-center m-8">
          <button
            onClick={handleShowContribution}
            className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
          >
            <AiFillQuestionCircle size={24} className="mr-2" />
            What is this?
          </button>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Upload Activity Evidence</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleSubmit}
              disabled={analyzed === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {analyzed === 1 ? 'Analyzing...' : 'Submit Evidence'}
            </button>
            <div className="flex justify-center mt-4">
              {getAnalysisIcon()}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center mb-4 text-2xl font-bold">Available Benefits</h2>
      <hr className="w-1/2 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignCards(BENEFIT_CARDS)}
      </div>
    </div>
  )

  // Error dialog
  const errorDialog = showErrDialog ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setShowErrDialog(false)}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium text-red-600">Error</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-red-500">{errorMsg.title}</p>
            {errorMsg.body && <p className="text-gray-500 mt-2">{errorMsg.body}</p>}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={() => setShowErrDialog(false)}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <Layout>
      <Banner title="Contribute" subtitle="Make a difference in your community" quote="The best way to find yourself is to lose yourself in the service of others." author="Mahatma Gandhi" />
      {auth ? loginContainer : noLoginContainer}
      {errorDialog}
    </Layout>
  )
}
