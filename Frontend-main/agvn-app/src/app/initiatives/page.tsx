'use client'

// @ts-nocheck

import React from "react"
import PageTitle from "../../components/PageTitle"
import { assignCards } from "../../components/InfoCard"
import { Banner } from "../../components/TheHeader"
import axios from "axios"
import { useState } from "react"
import Popups from "../../components/Popup"
import Layout from '../../components/TheLayout'

// Use public path for app router
const torch = '/assets/Initiative_logos/conservatism_logo_2.png'
const individual = '/assets/Initiative_logos/libertarianism_logo.png'
const triangleCircle = '/assets/Initiative_logos/progressivism_logo_2.png'
const ladyJustice = '/assets/Initiative_logos/neutral_logo_2.png'
const crown = '/assets/Initiative_logos/radical_conservatism_logo.png'
const fist = '/assets/Initiative_logos/radical_progressivism_logo.png'

const INITIATIVE_MAP = {
  1: "Conservatism",
  2: "Progressivism",
  3: "Libertarianism",
  4: "Activism",
  5: "Technocratism",
  6: "Socialism",
  7: "Statism",
  8: "Nationalism"
}

const INITIATIVES = [
  {
    title: "Conservatism",
    content: `Conservatism is the aesthetic, cultural, social, and political outlook that embodies the desire to conserve existing things, held to be either good in themselves, or better than the likely alternatives, or at least safe, familiar, and the objects of trust and affection.

    The central tenets of conservatism may vary in relation to the traditions and values of the culture and civilization in which it appears. In Western culture, conservatives seek to conserve a range of things such as organized religion, property rights, parliamentary government, family values, the natural environment, and classical and vernacular architecture.`,
    imageUrl: torch
  },
  {
    title: "Libertarianism",
    content: `Libertarianism is a political philosophy and movement that upholds liberty as a core principle. Libertarians seek to maximize autonomy and political freedom, emphasizing free association, freedom of choice, individualism and voluntary association.

    Libertarians share a skepticism of authority and state power, but some libertarians diverge on the scope of their opposition to existing economic and political systems.`,
    imageUrl: individual
  },
  {
    title: "Progressivism",
    content: `Progressivism is a political philosophy in support of social reform. Based on the idea of progress in which advancements in science, technology, economic development and social organization are vital to the improvement of the human condition.

    Contemporary progressives promote public policies that they believe will lead to positive social change.`,
    imageUrl: triangleCircle
  },
  {
    title: "Neutral/Centrist",
    content: `Political centrism is the range of political ideologies that exist between left-wing and right-wing politics. Centrists commonly hold a mixture of beliefs that don't align strictly with either liberal or conservative ideologies.

    Centrist politicians often seek pragmatic solutions and compromise between different political positions.`,
    imageUrl: ladyJustice
  }
]

export default function InitiativesPage() {
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [selectedInitiative, setSelectedInitiative] = useState<number | null>(null)
  const [isVoting, setIsVoting] = useState(false)

  const handleVoteForInitiative = async (initiativeId: number) => {
    setIsVoting(true)
    try {
      const response = await axios.post('http://localhost:8000/api/v1/vote-initiative', {
        initiative_id: initiativeId
      })

      if (response.status === 200) {
        setSuccessMsg('Your vote has been recorded successfully!')
        setSelectedInitiative(initiativeId)
      } else {
        setErrorMsg('Failed to record your vote. Please try again.')
      }
    } catch (error) {
      console.error('Voting error:', error)
      setErrorMsg('Error occurred while voting. Please try again.')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <Layout>
      {/* <PageTitle title="Initiatives - AGVN" /> */}
      <Banner
        title="Political Initiatives"
        subtitle="Choose the political direction that aligns with your values"
        quote="The only way to make sense out of change is to plunge into it, move with it, and join the dance."
        author="Alan Watts"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Available Political Initiatives</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each initiative represents a different political philosophy and approach to governance.
            Choose the one that best aligns with your values and vision for Australia&apos;s future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {INITIATIVES.map((initiative, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={initiative.imageUrl}
                    alt={initiative.title}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <h3 className="text-2xl font-bold">{initiative.title}</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {initiative.content}
                </p>
                <button
                  onClick={() => handleVoteForInitiative(index + 1)}
                  disabled={isVoting || selectedInitiative === index + 1}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${selectedInitiative === index + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isVoting && selectedInitiative === index + 1
                    ? 'Recording Vote...'
                    : selectedInitiative === index + 1
                      ? 'Voted ✓'
                      : 'Vote for this Initiative'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">About Political Initiatives</h3>
          <p className="text-gray-700">
            Your vote helps determine the overall political direction of government policies and decisions.
            Each initiative represents a different approach to governance, economics, and social issues.
            The initiative with the most votes will influence the types of policies that are prioritized
            and implemented.
          </p>
        </div>
      </div>

      <Popups type="error" message={errorMsg} />
      <Popups type="success" message={successMsg} />
    </Layout>
  )
}
