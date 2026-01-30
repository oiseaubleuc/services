'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  pageViews: {
    today: number
    week: number
    month: number
    total: number
    topPages: Array<{ path: string; count: number }>
    daily: Array<{ date: string; count: number }>
  }
  contacts: {
    today: number
    week: number
    month: number
    total: number
    new: number
    daily: Array<{ date: string; count: number }>
    byStatus: Array<{ status: string; count: number }>
  }
  appointments: {
    today: number
    week: number
    month: number
    total: number
    scheduled: number
    daily: Array<{ date: string; count: number }>
    byStatus: Array<{ status: string; count: number }>
    upcoming: Array<{
      id: number
      name: string
      email: string
      date: string
      time: string
      meet_link: string | null
    }>
  }
}

export default function Dashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) {
      router.push('/dashboard/login')
      return
    }

    fetchStats(token)
  }, [router])

  const fetchStats = async (token: string) => {
    try {
      const response = await fetch('/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem('dashboard_token')
        router.push('/dashboard/login')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('dashboard_token')
    router.push('/dashboard/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HohoSolutions Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Navigation */}
        <nav className="mb-8 flex gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/contacts"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Contacts
          </Link>
          <Link
            href="/dashboard/appointments"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Appointments
          </Link>
        </nav>

        {stats && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Page Views Today */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Page Views Today</div>
                <div className="text-3xl font-bold text-white">{stats.pageViews.today}</div>
                <div className="text-gray-400 text-xs mt-2">
                  {stats.pageViews.week} this week
                </div>
              </div>

              {/* Contacts Today */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Contacts Today</div>
                <div className="text-3xl font-bold text-white">{stats.contacts.today}</div>
                <div className="text-gray-400 text-xs mt-2">
                  {stats.contacts.new} new
                </div>
              </div>

              {/* Appointments Today */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Appointments Today</div>
                <div className="text-3xl font-bold text-white">{stats.appointments.today}</div>
                <div className="text-gray-400 text-xs mt-2">
                  {stats.appointments.scheduled} scheduled
                </div>
              </div>

              {/* Total Page Views */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-gray-400 text-sm mb-2">Total Page Views</div>
                <div className="text-3xl font-bold text-white">{stats.pageViews.total.toLocaleString()}</div>
                <div className="text-gray-400 text-xs mt-2">
                  All time
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Page Views Chart */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4">Page Views (Last 7 Days)</h2>
                <div className="space-y-2">
                  {stats.pageViews.daily && stats.pageViews.daily.length > 0 ? (
                    stats.pageViews.daily.map((day, index) => {
                      const maxCount = Math.max(...stats.pageViews.daily.map(d => d.count), 1)
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="text-sm text-gray-400 w-24">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="bg-white/30 h-full rounded-full transition-all"
                              style={{
                                width: `${(day.count / maxCount) * 100}%`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {day.count}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-gray-400 text-center py-4">No data available</div>
                  )}
                </div>
              </div>

              {/* Top Pages */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4">Top Pages</h2>
                <div className="space-y-3">
                  {stats.pageViews.topPages && stats.pageViews.topPages.length > 0 ? (
                    stats.pageViews.topPages.map((page, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="text-gray-300 truncate flex-1">{page.path}</div>
                        <div className="text-white font-semibold ml-4">{page.count}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center py-4">No data available</div>
                  )}
                </div>
              </div>
            </div>

            {/* Contacts & Appointments Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Contacts Chart */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4">Contacts (Last 7 Days)</h2>
                <div className="space-y-2">
                  {stats.contacts.daily && stats.contacts.daily.length > 0 ? (
                    stats.contacts.daily.map((day, index) => {
                      const maxCount = Math.max(...stats.contacts.daily.map(d => d.count), 1)
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="text-sm text-gray-400 w-24">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="bg-blue-500/50 h-full rounded-full transition-all"
                              style={{
                                width: `${(day.count / maxCount) * 100}%`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {day.count}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-gray-400 text-center py-4">No data available</div>
                  )}
                </div>
                {stats.contacts.byStatus && stats.contacts.byStatus.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-semibold mb-3 text-gray-400">By Status</h3>
                    <div className="space-y-2">
                      {stats.contacts.byStatus.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{item.status.replace('_', ' ')}</span>
                          <span className="text-white font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Appointments Chart */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4">Appointments (Last 7 Days)</h2>
                <div className="space-y-2">
                  {stats.appointments.daily && stats.appointments.daily.length > 0 ? (
                    stats.appointments.daily.map((day, index) => {
                      const maxCount = Math.max(...stats.appointments.daily.map(d => d.count), 1)
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="text-sm text-gray-400 w-24">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                            <div
                              className="bg-green-500/50 h-full rounded-full transition-all"
                              style={{
                                width: `${(day.count / maxCount) * 100}%`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {day.count}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-gray-400 text-center py-4">No data available</div>
                  )}
                </div>
                {stats.appointments.byStatus && stats.appointments.byStatus.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-semibold mb-3 text-gray-400">By Status</h3>
                    <div className="space-y-2">
                      {stats.appointments.byStatus.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{item.status.replace('_', ' ')}</span>
                          <span className="text-white font-semibold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Appointments */}
            {stats.appointments.upcoming && stats.appointments.upcoming.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
                <h2 className="text-xl font-bold mb-4">Upcoming Appointments (Next 7 Days)</h2>
                <div className="space-y-3">
                  {stats.appointments.upcoming.map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold">{appointment.name}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })} at {appointment.time}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.email}</div>
                      </div>
                      {appointment.meet_link && (
                        <a
                          href={appointment.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                        >
                          Join Meet
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Contacts Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-semibold">{stats.contacts.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Week</span>
                    <span className="text-white font-semibold">{stats.contacts.week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-white font-semibold">{stats.contacts.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">New</span>
                    <span className="text-yellow-400 font-semibold">{stats.contacts.new}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Appointments Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-semibold">{stats.appointments.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Week</span>
                    <span className="text-white font-semibold">{stats.appointments.week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-white font-semibold">{stats.appointments.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Scheduled</span>
                    <span className="text-green-400 font-semibold">{stats.appointments.scheduled}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Page Views Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-semibold">{stats.pageViews.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Week</span>
                    <span className="text-white font-semibold">{stats.pageViews.week}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">This Month</span>
                    <span className="text-white font-semibold">{stats.pageViews.month}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Today</span>
                    <span className="text-blue-400 font-semibold">{stats.pageViews.today}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
