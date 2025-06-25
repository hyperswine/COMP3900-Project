'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie'
import { Banner } from '../../components/TheHeader'
import PageTitle from '../../components/PageTitle'
import Layout from '../../components/TheLayout'

interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  read: boolean
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Policy Available',
    message: 'A new healthcare policy is now available for voting. Cast your vote to make your voice heard.',
    type: 'info',
    timestamp: '2025-06-25T10:00:00Z',
    read: false
  },
  {
    id: 2,
    title: 'Voting Period Ending Soon',
    message: 'The voting period for education reform policies ends in 2 days. Make sure to submit your votes.',
    type: 'warning',
    timestamp: '2025-06-24T15:30:00Z',
    read: false
  },
  {
    id: 3,
    title: 'Your Vote Recorded',
    message: 'Thank you for participating! Your vote on environmental policies has been successfully recorded.',
    type: 'success',
    timestamp: '2025-06-23T09:15:00Z',
    read: true
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'The platform will be undergoing maintenance tonight from 11 PM to 1 AM. Voting will be temporarily unavailable.',
    type: 'info',
    timestamp: '2025-06-22T14:00:00Z',
    read: true
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const cookies = new Cookies()
  const router = useRouter()

  useEffect(() => {
    const token = cookies.get('token')
    if (!token) {
      router.push('/auth/signin')
      return
    }

    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 500)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredNotifications = notifications.filter(notif =>
    filter === 'all' || !notif.read
  )

  const unreadCount = notifications.filter(notif => !notif.read).length

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
      {/* <PageTitle title="Notifications - AGVN" /> */}
      <Banner
        title="Notifications"
        subtitle="Stay updated with the latest news and updates"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Notifications</h2>
              <p className="text-gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'unread'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM7 7h3v3H7V7z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications available'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-6 transition-all ${notification.read
                    ? 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(notification.type)}`}>
                          {notification.type.toUpperCase()}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{notification.title}</h3>
                      <p className="text-gray-700 mb-3">{notification.message}</p>
                      <p className="text-sm text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
