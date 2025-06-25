'use client';

import React from "react"
import { assignCards } from "../../components/InfoCard"
import PageTitle from "../../components/PageTitle"
import { Banner } from '../../components/TheHeader'
import axios from "axios"
import Layout from '../../components/TheLayout'

// Use public path for app router
const agriculture = '/assets/Departments_logos/Agriculture.jpg'
const defence = '/assets/Departments_logos/defence.png'
const edu = '/assets/Departments_logos/edu.png'
const finance = '/assets/Departments_logos/Finance.jpg'
const foreign = '/assets/Departments_logos/foreign-affairs.png'
const health = '/assets/Departments_logos/health.png'
const home_affairs = '/assets/Departments_logos/home-affairs.png'
const industry = '/assets/Departments_logos/industry-science.png'
const infrastructure = '/assets/Departments_logos/infrastructure.jpg'
const social = '/assets/Departments_logos/social-services.png'
const veterans = '/assets/Departments_logos/veterans.png'

const DEPARTMENTS = [
  {
    title: "Defense",
    subtitle: "Defense, is superior to opulence.",
    content: `We all know that a strong country requires strong defense.
    The Australian Defence Force (ADF) is the military organisation responsible for the defence of Australia and its national interests. It consists of the Royal Australian Navy (RAN), Australian Army, Royal Australian Air Force (RAAF) and several "tri-service" units. The ADF has a strength of just over 85,000 full-time personnel and active reservists and is supported by the Department of Defence and several other civilian agencies.

    During the first decades of the 20th century, the Australian Government established the armed services as separate organisations. Each service had an independent chain of command. In 1976, the government made a strategic change and established the ADF to place the services under a single headquarters. Over time, the degree of integration has increased and tri-service headquarters, logistics, and training institutions have supplanted many single-service establishments.

    The ADF is technologically sophisticated but relatively small. Although the ADF's 58,206 full-time active-duty personnel and 29,560 active reservists make it the largest military in Oceania, it is smaller than most Asian military forces. Nonetheless, the ADF is supported by a significant budget by worldwide standards and can deploy forces in multiple locations outside Australia.`,
    imageUrl: defence,
  },
  {
    title: "Agriculture & Environment",
    subtitle: "The environment just got greener.",
    content: "Whether a bushfire or a flood, we got you covered. The environment is the basis for all life.",
    imageUrl: agriculture,
  },
  {
    title: "Infrastructure & Transport",
    subtitle: "Learn more about the federal government's transport schemes.",
    content: "The best transport is teleportation.",
    imageUrl: infrastructure,
  },
  {
    title: "Education, Skills & Employment",
    subtitle: "Learn more about the federal government's education schemes.",
    content: "Education is the foundation of progress.",
    imageUrl: edu,
  },
  {
    title: "Finance",
    subtitle: "Managing Australia's finances.",
    content: "Responsible fiscal management for a prosperous future.",
    imageUrl: finance,
  },
  {
    title: "Foreign Affairs & Trade",
    subtitle: "Australia's global relationships.",
    content: "Building bridges and strengthening international partnerships.",
    imageUrl: foreign,
  },
  {
    title: "Health",
    subtitle: "Keeping Australians healthy.",
    content: "Comprehensive healthcare for all Australians.",
    imageUrl: health,
  },
  {
    title: "Home Affairs",
    subtitle: "Protecting Australia's borders and communities.",
    content: "Security and immigration services.",
    imageUrl: home_affairs,
  },
  {
    title: "Industry, Science & Resources",
    subtitle: "Driving innovation and industry growth.",
    content: "Supporting Australian industry and scientific advancement.",
    imageUrl: industry,
  },
  {
    title: "Social Services",
    subtitle: "Supporting Australian families and communities.",
    content: "Social welfare and community support services.",
    imageUrl: social,
  },
  {
    title: "Veterans' Affairs",
    subtitle: "Supporting those who served.",
    content: "Caring for our veterans and their families.",
    imageUrl: veterans,
  }
]

export default function DepartmentsPage() {
  const [feedback, setFeedback] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return

    setSubmitting(true)
    try {
      const response = await axios.post('http://localhost:8000/api/v1/feedback', {
        feedback: feedback,
        page: 'departments'
      })
      console.log('Feedback submitted:', response.data)
      setFeedback("")
      alert('Thank you for your feedback!')
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <PageTitle title="Departments - AGVN" />
      <Banner title="Departments" subtitle="Learn about Australian Government Departments" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {assignCards(DEPARTMENTS)}
        </div>

        <hr className="my-12 border-gray-300" />

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Have feedback about our departments?
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts about our departments..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSubmitFeedback}
              disabled={submitting || !feedback.trim()}
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
