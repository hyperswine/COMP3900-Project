'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import ContributeChart from '../../components/ContributeChart'
import PageTitle from "../../components/PageTitle"
import Popups from '../../components/Popup'
import Layout from '../../components/TheLayout'

const host = 'http://127.0.0.1:8000/api/v1'

const policyTypeValueSample = [
  {
    policyType: 'Taxation',
    favorability: 'High'
  },
  {
    policyType: 'Health',
    favorability: 'Neutral'
  },
  {
    policyType: 'Education',
    favorability: 'High'
  },
  {
    policyType: 'Environment',
    favorability: 'Very High'
  }
]

const PoliticalInterests = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Political Interests</h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 font-bold text-gray-700 border-b pb-2">
          <div>Policy Types</div>
          <div>Favorableness</div>
        </div>
        {policyTypeValueSample.map((p, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 py-2">
            <div>{p.policyType}</div>
            <div className={`font-medium ${p.favorability === 'High' || p.favorability === 'Very High'
                ? 'text-green-600'
                : p.favorability === 'Neutral'
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}>
              {p.favorability}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Profile() {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [age, setAge] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [postcode, setPostcode] = React.useState('')
  const [driverLicense, setDriverLicense] = React.useState('')
  const [medicare, setMedicare] = React.useState('')
  const [irn, setIrn] = React.useState('')
  const [errorMsg, setErrorMsg] = React.useState('')
  const [successMsg, setSuccessMsg] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  const cookies = new Cookies()
  const router = useRouter()

  React.useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      router.push('/auth/signin')
      return
    }

    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = cookies.get('token')
      const response = await fetch(`${host}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setEmail(userData.email || '')
        setName(userData.name || '')
        setSex(userData.sex || '')
        setAge(userData.age || '')
        setPhoneNumber(userData.phone_number || '')
        setPostcode(userData.postcode || '')
        setDriverLicense(userData.driver_license || '')
        setMedicare(userData.medicare || '')
        setIrn(userData.individual_reference_number || '')
      } else {
        setErrorMsg('Failed to load profile data')
      }
    } catch (error) {
      setErrorMsg('Error loading profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    cookies.remove('token')
    router.push('/')
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
      <PageTitle title="Profile - AGVN" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {name || 'User Profile'}
                  </h1>
                  <p className="text-blue-100 mt-2">{email}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/profile/edit')}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                        <p className="text-gray-900 bg-white p-2 rounded border">{sex || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <p className="text-gray-900 bg-white p-2 rounded border">{age || 'Not provided'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{phoneNumber || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{postcode || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Government Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Government Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Driver License</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{driverLicense || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medicare Number</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{medicare || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Individual Reference Number</label>
                      <p className="text-gray-900 bg-white p-2 rounded border">{irn || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Political Interests */}
                <div className="lg:col-span-2">
                  <PoliticalInterests />
                </div>

                {/* Contribution Chart */}
                <div className="lg:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Contribution History</h3>
                    <ContributeChart data={[10, 15, 8, 20, 12, 18, 25]} width={400} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popups type="error" message={errorMsg} />
      <Popups type="success" message={successMsg} />
    </Layout>
  )
}
