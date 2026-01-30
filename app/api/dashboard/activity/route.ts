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
    const entityType = searchParams.get('entityType')
    const entityId = searchParams.get('entityId')
    const limit = parseInt(searchParams.get('limit') || '100')

    let query = 'SELECT * FROM activity_logs WHERE 1=1'
    const params: any[] = []

    if (entityType) {
      query += ' AND entity_type = ?'
      params.push(entityType)
    }

    if (entityId) {
      query += ' AND entity_id = ?'
      params.push(entityId)
    }

    query += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)

    const logs = db.prepare(query).all(...params)

    return NextResponse.json({ logs })
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
