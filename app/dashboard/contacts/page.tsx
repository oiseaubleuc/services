'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  project_type: string
  message: string
  package_interest: string | null
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived'
  created_at: string
  updated_at: string
}

interface Note {
  id: number
  contact_id: number
  note: string
  created_at: string
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [expandedContact, setExpandedContact] = useState<number | null>(null)
  const [notes, setNotes] = useState<Record<number, Note[]>>({})
  const [newNote, setNewNote] = useState<Record<number, string>>({})
  const itemsPerPage = 20

  useEffect(() => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) {
      router.push('/dashboard/login')
      return
    }

    fetchContacts(token)
  }, [router, filter, search, sortBy, sortOrder, dateFrom, dateTo, currentPage])

  const fetchContacts = async (token: string) => {
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
      
      const response = await fetch(`/api/dashboard/contacts?${params}`, {
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
      setContacts(data.contacts || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchNotes = async (contactId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch(`/api/dashboard/contacts/notes?contactId=${contactId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setNotes(prev => ({ ...prev, [contactId]: data.notes || [] }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch('/api/dashboard/contacts', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        fetchContacts(token)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const bulkUpdateStatus = async (status: string) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token || selectedIds.length === 0) return

    try {
      const response = await fetch('/api/dashboard/contacts', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bulkIds: selectedIds, bulkStatus: status }),
      })

      if (response.ok) {
        setSelectedIds([])
        fetchContacts(token)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const addNote = async (contactId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token || !newNote[contactId]) return

    try {
      const response = await fetch('/api/dashboard/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactId, note: newNote[contactId] }),
      })

      if (response.ok) {
        setNewNote(prev => ({ ...prev, [contactId]: '' }))
        fetchNotes(contactId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const deleteNote = async (noteId: number, contactId: number) => {
    const token = localStorage.getItem('dashboard_token')
    if (!token) return

    try {
      const response = await fetch(`/api/dashboard/contacts/notes?noteId=${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchNotes(contactId)
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

      const response = await fetch(`/api/dashboard/contacts/export?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`
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
    if (expandedContact === id) {
      setExpandedContact(null)
    } else {
      setExpandedContact(id)
      if (!notes[id]) {
        fetchNotes(id)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in_progress':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'archived':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-white/10 text-white border-white/20'
    }
  }

  const totalPages = Math.ceil(total / itemsPerPage)

  if (loading && contacts.length === 0) {
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
          <h1 className="text-2xl font-bold">Contacts Management</h1>
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
              <option value="created_at">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="status">Sort by Status</option>
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
            {['new', 'contacted', 'in_progress', 'completed', 'archived'].map(status => (
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
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
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

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(contact.id)}
                  onChange={() => toggleSelect(contact.id)}
                  className="mt-2 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-semibold">{contact.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(contact.status)}`}>
                          {contact.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-gray-400 space-y-1 text-sm">
                        <div>Email: <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">{contact.email}</a></div>
                        {contact.phone && (
                          <div>Phone: <a href={`tel:${contact.phone}`} className="text-blue-400 hover:underline">{contact.phone}</a></div>
                        )}
                        <div>Project Type: {contact.project_type}</div>
                        {contact.package_interest && (
                          <div>Package Interest: <span className="text-yellow-400">{contact.package_interest}</span></div>
                        )}
                        <div>Date: {new Date(contact.created_at).toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        onClick={() => toggleExpand(contact.id)}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
                      >
                        {expandedContact === contact.id ? '▼' : '▶'} Details
                      </button>
                    </div>
                  </div>

                  {expandedContact === contact.id && (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Message:</div>
                        <div className="text-gray-300 whitespace-pre-wrap">{contact.message}</div>
                      </div>

                      {/* Notes Section */}
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-lg font-semibold mb-3">Notes</h4>
                        <div className="space-y-2 mb-4">
                          {notes[contact.id]?.map((note) => (
                            <div key={note.id} className="flex justify-between items-start p-3 bg-white/5 rounded">
                              <div className="flex-1">
                                <div className="text-sm text-gray-300">{note.note}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {new Date(note.created_at).toLocaleString()}
                                </div>
                              </div>
                              <button
                                onClick={() => deleteNote(note.id, contact.id)}
                                className="ml-2 text-red-400 hover:text-red-300"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <textarea
                            value={newNote[contact.id] || ''}
                            onChange={(e) => setNewNote(prev => ({ ...prev, [contact.id]: e.target.value }))}
                            placeholder="Add a note..."
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                            rows={2}
                          />
                          <button
                            onClick={() => addNote(contact.id)}
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
          ))}

          {contacts.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-400">
              No contacts found
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
