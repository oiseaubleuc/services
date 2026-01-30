import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

function authenticate(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  const token = authHeader.substring(7)
  const expectedToken = process.env.DASHBOARD_TOKEN || 'default-dashboard-token-change-in-production'
  if (token !== expectedToken) {
    return null
  }
  return true
}

export async function GET(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'DESC'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    let query = 'SELECT * FROM contacts WHERE 1=1'
    const params: any[] = []

    if (status && status !== 'all') {
      query += ' AND status = ?'
      params.push(status)
    }

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ? OR project_type LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm)
    }

    if (dateFrom) {
      query += ' AND DATE(created_at) >= ?'
      params.push(dateFrom)
    }

    if (dateTo) {
      query += ' AND DATE(created_at) <= ?'
      params.push(dateTo)
    }

    // Validate sortBy to prevent SQL injection
    const allowedSortColumns = ['created_at', 'updated_at', 'name', 'email', 'status']
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at'
    const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'

    query += ` ORDER BY ${safeSortBy} ${safeSortOrder} LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const contacts = db.prepare(query).all(...params)

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM contacts WHERE 1=1'
    const countParams: any[] = []
    
    if (status && status !== 'all') {
      countQuery += ' AND status = ?'
      countParams.push(status)
    }
    
    if (search) {
      countQuery += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ? OR project_type LIKE ?)'
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm)
    }
    
    if (dateFrom) {
      countQuery += ' AND DATE(created_at) >= ?'
      countParams.push(dateFrom)
    }
    
    if (dateTo) {
      countQuery += ' AND DATE(created_at) <= ?'
      countParams.push(dateTo)
    }

    const totalResult = db.prepare(countQuery).get(...countParams) as { total: number }

    return NextResponse.json({ 
      contacts,
      total: totalResult.total,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, status, bulkIds, bulkStatus } = body

    // Bulk update
    if (bulkIds && Array.isArray(bulkIds) && bulkStatus) {
      const placeholders = bulkIds.map(() => '?').join(',')
      db.prepare(`
        UPDATE contacts 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id IN (${placeholders})
      `).run(bulkStatus, ...bulkIds)

      // Log activity
      bulkIds.forEach((contactId: number) => {
        db.prepare(`
          INSERT INTO activity_logs (entity_type, entity_id, action, details)
          VALUES (?, ?, ?, ?)
        `).run('contact', contactId, 'status_updated', JSON.stringify({ status: bulkStatus, bulk: true }))
      })

      return NextResponse.json({ success: true, updated: bulkIds.length })
    }

    // Single update
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    const oldContact = db.prepare('SELECT status FROM contacts WHERE id = ?').get(id) as { status: string } | undefined
    if (!oldContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    db.prepare(`
      UPDATE contacts 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, id)

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (entity_type, entity_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run('contact', id, 'status_updated', JSON.stringify({ from: oldContact.status, to: status }))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { contactId, note } = body

    if (!contactId || !note) {
      return NextResponse.json({ error: 'Missing contactId or note' }, { status: 400 })
    }

    const result = db.prepare(`
      INSERT INTO contact_notes (contact_id, note)
      VALUES (?, ?)
    `).run(contactId, note)

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (entity_type, entity_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run('contact', contactId, 'note_added', JSON.stringify({ noteId: result.lastInsertRowid }))

    return NextResponse.json({ success: true, noteId: result.lastInsertRowid })
  } catch (error) {
    console.error('Error adding note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
