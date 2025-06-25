'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { Banner } from '../../components/TheHeader'
import PageTitle from '../../components/PageTitle'
import Popups from '../../components/Popup'
import axios from 'axios'
import Layout from '../../components/TheLayout'

interface Policy {
  id: number
  title: string
  description: string
  policy_type: number
  policy_cost: number
  initiative: number
}

const PolicyTypeMapping = [
  "Taxation",
  "Lifestyle and Culture",
  "Community",
  "Infrastructure and Transport",
  "Foreign Relations",
  "Health",
  "Education and Employment",
  "National Security",
  "Safety",
  "Industry",
  "Science and Technology",
  "Environment",
  "Energy",
  "Assets",
  "Economy",
  "Foreign Trade",
  "Natural Resources"
]

export default function VotePage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [selectedPolicies, setSelectedPolicies] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const cookies = new Cookies()
  const router = useRouter()

  useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      router.push('/auth/signin')
      return
    }
    setIsAuthenticated(true)
    fetchPolicies()
  }, [])

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/policy')
      setPolicies(response.data)
    } catch (error) {
      console.error('Error fetching policies:', error)
      setErrorMsg('Failed to load policies. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePolicySelect = (policyId: number) => {
    setSelectedPolicies(prev => {
      if (prev.includes(policyId)) {
        return prev.filter(id => id !== policyId)
      } else {
        return [...prev, policyId]
      }
    })
  }

  const handleSubmitVotes = async () => {
    if (selectedPolicies.length === 0) {
      setErrorMsg('Please select at least one policy to vote for.')
      return
    }

    setSubmitting(true)
    try {
      const token = cookies.get('token')
      const response = await axios.post(
        'http://localhost:8000/api/v1/vote',
        { policy_ids: selectedPolicies },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        setSuccessMsg('Your votes have been recorded successfully!')
        setSelectedPolicies([])
      } else {
        setErrorMsg('Failed to record your votes. Please try again.')
      }
    } catch (error) {
      console.error('Voting error:', error)
      setErrorMsg('Error occurred while voting. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to vote on policies.</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <PageTitle title="Vote - AGVN" />
      <Banner
        title="Vote on Policies"
        subtitle="Shape Australia's future by voting on important policies"
        quote="Your vote is your voice in democracy."
        author="Unknown"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Available Policies</h2>
            <p className="text-gray-600">
              Select the policies you support. Your votes help determine which policies are prioritized.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Selected: {selectedPolicies.length} policies</strong>
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className={`border rounded-lg p-6 cursor-pointer transition-all ${selectedPolicies.includes(policy.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
                onClick={() => handlePolicySelect(policy.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={selectedPolicies.includes(policy.id)}
                        onChange={() => handlePolicySelect(policy.id)}
                        className="mr-3 h-5 w-5 text-blue-600"
                      />
                      <h3 className="text-xl font-bold">{policy.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-3">{policy.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                        {PolicyTypeMapping[policy.policy_type] || 'Unknown'}
                      </span>
                      <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm">
                        Cost: ${policy.policy_cost?.toLocaleString() || 'TBD'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {policies.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No policies available for voting at this time.</p>
            </div>
          )}

          {policies.length > 0 && (
            <div className="text-center">
              <button
                onClick={handleSubmitVotes}
                disabled={submitting || selectedPolicies.length === 0}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Submitting Votes...' : `Submit ${selectedPolicies.length} Votes`}
              </button>
            </div>
          )}
        </div>
      </div>

      <Popups type="error" message={errorMsg} />
      <Popups type="success" message={successMsg} />
    </Layout>
  )
}
