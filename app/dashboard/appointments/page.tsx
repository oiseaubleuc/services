'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Appointment {
  id: number
  name: string
  email: string
  phone: string | null
  message: string | null
  date: string
  time: string
  meet_link: string | null
  calendar_event_id: string | null
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  created_at: string
  updated_at: string
}

interface Note {
  id: number
  appointment_id: number
  note: string
  created_at: string
}

export default function AppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null)
  const [notes, setNotes] = useState<Record<number, Note[]>>({})
  const [newNote, setNewNote] = useState<Record<number, string>>({})
  const itemsPerPage = 20

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) {
      router.push('/dashboard/login')
      return
    }

    fetchAppointments(token)
  }, [router, filter, search, sortBy, sortOrder, dateFrom, dateTo, currentPage])

  const fetchAppointments = async (token: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        status: filter,
        search: search,
        sortBy: sortBy,
        sortOrder: sortOrder,
        limit: itemsPerPage.toString(),
        offset: ((currentPage - 1) * itemsPerPage).toString(),
      })
      
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)
      
      const response = await fetch(`/api/dashboard/appointments?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem('dashboard_token')
        router.push('/dashboard/login')
        return
      }

      const data = await response.json()
      setAppointments(data.appointments || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchNotes = async (appointmentId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch(`/api/dashboard/appointments/notes?appointmentId=${appointmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setNotes(prev => ({ ...prev, [appointmentId]: data.notes || [] }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch('/api/dashboard/appointments', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        fetchAppointments(token)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const bulkUpdateStatus = async (status: string) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token || selectedIds.length === 0) return

    try {
      const response = await fetch('/api/dashboard/appointments', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bulkIds: selectedIds, bulkStatus: status }),
      })

      if (response.ok) {
        setSelectedIds([])
        fetchAppointments(token)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addNote = async (appointmentId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token || !newNote[appointmentId]) return

    try {
      const response = await fetch('/api/dashboard/appointments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId, note: newNote[appointmentId] }),
      })

      if (response.ok) {
        setNewNote(prev => ({ ...prev, [appointmentId]: '' }))
        fetchNotes(appointmentId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const deleteNote = async (noteId: number, appointmentId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch(`/api/dashboard/appointments/notes?noteId=${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchNotes(appointmentId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const exportCSV = async () => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const params = new URLSearchParams({ status: filter })
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)

      const response = await fetch(`/api/dashboard/appointments/export?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const toggleExpand = (id: number) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null)
    } else {
      setExpandedAppointment(id)
      if (!notes[id]) {
        fetchNotes(id)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'no_show':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default:
        return 'bg-white/10 text-white border-white/20'
    }
  }

  const isUpcoming = (date: string, time: string) => {
    const appointmentDateTime = new Date(`${date}T${time}`)
    return appointmentDateTime > new Date()
  }

  const totalPages = Math.ceil(total / itemsPerPage)

  if (loading && appointments.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointments Management</h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, phone, message..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
            >
              Export CSV
            </button>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setCurrentPage(1)
              }}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="time">Sort by Time</option>
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="status">Sort by Status</option>
              <option value="created_at">Sort by Created</option>
            </select>

            <button
              onClick={() => {
                setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')
                setCurrentPage(1)
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              {sortOrder === 'ASC' ? '↑' : '↓'}
            </button>
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setFilter('all')
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              All ({total})
            </button>
            {['scheduled', 'completed', 'cancelled', 'no_show'].map(status => (
              <button
                key={status}
                onClick={() => {
                  setFilter(status)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  filter === status ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex gap-2 items-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span className="text-blue-400">{selectedIds.length} selected</span>
              <select
                onChange={(e) => bulkUpdateStatus(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                defaultValue=""
              >
                <option value="" disabled>Bulk update status...</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.map((appointment) => {
            const upcoming = isUpcoming(appointment.date, appointment.time)
            return (
              <div
                key={appointment.id}
                className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border ${
                  upcoming ? 'border-blue-500/30' : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(appointment.id)}
                    onChange={() => toggleSelect(appointment.id)}
                    className="mt-2 w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-semibold">{appointment.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(appointment.status)}`}>
                            {appointment.status.replace('_', ' ')}
                          </span>
                          {upcoming && (
                            <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <div className="text-gray-400 space-y-1 text-sm">
                          <div>Email: <a href={`mailto:${appointment.email}`} className="text-blue-400 hover:underline">{appointment.email}</a></div>
                          {appointment.phone && (
                            <div>Phone: <a href={`tel:${appointment.phone}`} className="text-blue-400 hover:underline">{appointment.phone}</a></div>
                          )}
                          <div className="text-lg font-semibold text-white mt-2">
                            📅 {new Date(appointment.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-lg font-semibold text-white">
                            🕐 {appointment.time}
                          </div>
                          {appointment.meet_link && (
                            <div>
                              <a 
                                href={appointment.meet_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-400 hover:underline"
                              >
                                Join Google Meet →
                              </a>
                            </div>
                          )}
                          <div className="text-sm mt-2">Created: {new Date(appointment.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={appointment.status}
                          onChange={(e) => updateStatus(appointment.id, e.target.value)}
                          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="no_show">No Show</option>
                        </select>
                        <button
                          onClick={() => toggleExpand(appointment.id)}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
                        >
                          {expandedAppointment === appointment.id ? '▼' : '▶'} Details
                        </button>
                      </div>
                    </div>

                    {expandedAppointment === appointment.id && (
                      <div className="mt-4 space-y-4">
                        {appointment.message && (
                          <div className="p-4 bg-white/5 rounded-lg">
                            <div className="text-sm text-gray-400 mb-1">Message:</div>
                            <div className="text-gray-300 whitespace-pre-wrap">{appointment.message}</div>
                          </div>
                        )}

                        {/* Notes Section */}
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3">Notes</h4>
                          <div className="space-y-2 mb-4">
                            {notes[appointment.id]?.map((note) => (
                              <div key={note.id} className="flex justify-between items-start p-3 bg-white/5 rounded">
                                <div className="flex-1">
                                  <div className="text-sm text-gray-300">{note.note}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {new Date(note.created_at).toLocaleString()}
                                  </div>
                                </div>
                                <button
                                  onClick={() => deleteNote(note.id, appointment.id)}
                                  className="ml-2 text-red-400 hover:text-red-300"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <textarea
                              value={newNote[appointment.id] || ''}
                              onChange={(e) => setNewNote(prev => ({ ...prev, [appointment.id]: e.target.value }))}
                              placeholder="Add a note..."
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                              rows={2}
                            />
                            <button
                              onClick={() => addNote(appointment.id)}
                              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {appointments.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              No appointments found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
