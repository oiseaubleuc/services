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
    const sortBy = searchParams.get('sortBy') || 'date'
    const sortOrder = searchParams.get('sortOrder') || 'ASC'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    let query = 'SELECT * FROM appointments WHERE 1=1'
    const params: any[] = []

    if (status && status !== 'all') {
      query += ' AND status = ?'
      params.push(status)
    }

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)'
      const searchTerm = `%${search}%`
      params.push(searchTerm, searchTerm, searchTerm, searchTerm)
    }

    if (dateFrom) {
      query += ' AND date >= ?'
      params.push(dateFrom)
    }

    if (dateTo) {
      query += ' AND date <= ?'
      params.push(dateTo)
    }

    // Validate sortBy to prevent SQL injection
    const allowedSortColumns = ['date', 'time', 'created_at', 'updated_at', 'name', 'email', 'status']
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : 'date'
    const safeSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'

    if (safeSortBy === 'date') {
      query += ` ORDER BY date ${safeSortOrder}, time ${safeSortOrder === 'ASC' ? 'ASC' : 'DESC'}`
    } else {
      query += ` ORDER BY ${safeSortBy} ${safeSortOrder}`
    }
    
    query += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const appointments = db.prepare(query).all(...params)

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM appointments WHERE 1=1'
    const countParams: any[] = []
    
    if (status && status !== 'all') {
      countQuery += ' AND status = ?'
      countParams.push(status)
    }
    
    if (search) {
      countQuery += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ?)'
      const searchTerm = `%${search}%`
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm)
    }
    
    if (dateFrom) {
      countQuery += ' AND date >= ?'
      countParams.push(dateFrom)
    }
    
    if (dateTo) {
      countQuery += ' AND date <= ?'
      countParams.push(dateTo)
    }

    const totalResult = db.prepare(countQuery).get(...countParams) as { total: number }

    return NextResponse.json({ 
      appointments,
      total: totalResult.total,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
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
        UPDATE appointments 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id IN (${placeholders})
      `).run(bulkStatus, ...bulkIds)

      // Log activity
      bulkIds.forEach((appointmentId: number) => {
        db.prepare(`
          INSERT INTO activity_logs (entity_type, entity_id, action, details)
          VALUES (?, ?, ?, ?)
        `).run('appointment', appointmentId, 'status_updated', JSON.stringify({ status: bulkStatus, bulk: true }))
      })

      return NextResponse.json({ success: true, updated: bulkIds.length })
    }

    // Single update
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    const oldAppointment = db.prepare('SELECT status FROM appointments WHERE id = ?').get(id) as { status: string } | undefined
    if (!oldAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    db.prepare(`
      UPDATE appointments 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(status, id)

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (entity_type, entity_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run('appointment', id, 'status_updated', JSON.stringify({ from: oldAppointment.status, to: status }))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { appointmentId, note } = body

    if (!appointmentId || !note) {
      return NextResponse.json({ error: 'Missing appointmentId or note' }, { status: 400 })
    }

    const result = db.prepare(`
      INSERT INTO appointment_notes (appointment_id, note)
      VALUES (?, ?)
    `).run(appointmentId, note)

    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (entity_type, entity_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run('appointment', appointmentId, 'note_added', JSON.stringify({ noteId: result.lastInsertRowid }))

    return NextResponse.json({ success: true, noteId: result.lastInsertRowid })
  } catch (error) {
    console.error('Error adding note:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
