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
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    let query = 'SELECT * FROM contacts WHERE 1=1'
    const params: any[] = []

    if (status && status !== 'all') {
      query += ' AND status = ?'
      params.push(status)
    }

    if (dateFrom) {
      query += ' AND DATE(created_at) >= ?'
      params.push(dateFrom)
    }

    if (dateTo) {
      query += ' AND DATE(created_at) <= ?'
      params.push(dateTo)
    }

    query += ' ORDER BY created_at DESC'

    const contacts = db.prepare(query).all(...params) as any[]

    // Generate CSV
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Project Type', 'Package Interest', 'Status', 'Message', 'Created At', 'Updated At']
    const rows = contacts.map(contact => [
      contact.id,
      `"${contact.name.replace(/"/g, '""')}"`,
      contact.email,
      contact.phone || '',
      `"${contact.project_type.replace(/"/g, '""')}"`,
      contact.package_interest || '',
      contact.status,
      `"${contact.message.replace(/"/g, '""')}"`,
      contact.created_at,
      contact.updated_at
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="contacts-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting contacts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
