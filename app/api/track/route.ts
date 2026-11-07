import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referer, userAgent, event, packageId } = body

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Save page view
    const storedPath = event ? `[${event}${packageId ? `:${packageId}` : ''}] ${path || '/'}` : path || '/'
    db.prepare(`
      INSERT INTO page_views (path, referer, user_agent, ip_address)
      VALUES (?, ?, ?, ?)
    `).run(storedPath, referer || null, userAgent || null, ip)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
