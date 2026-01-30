import { NextRequest, NextResponse } from 'next/server'
import { verifyUser } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    // For now, use a simple password check from env
    // You can improve this to use the database
    const dashboardPassword = process.env.DASHBOARD_PASSWORD || 'admin123'
    
    if (password !== dashboardPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    // Return the same token that will be used for authentication
    // If DASHBOARD_TOKEN is set, use it. Otherwise generate one and use it consistently
    let dashboardToken = process.env.DASHBOARD_TOKEN
    
    if (!dashboardToken) {
      // Generate a token and store it (in production, set this in env)
      // For now, we'll use a consistent default
      dashboardToken = 'default-dashboard-token-change-in-production'
      console.warn('DASHBOARD_TOKEN not set, using default token. Set DASHBOARD_TOKEN in .env.local for production!')
    }

    return NextResponse.json({ 
      success: true, 
      token: dashboardToken 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
