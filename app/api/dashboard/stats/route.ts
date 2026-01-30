import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { verifyUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Simple auth check via header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    // For now, use a simple token check (you can improve this)
    const expectedToken = process.env.DASHBOARD_TOKEN || 'default-dashboard-token-change-in-production'
    if (token !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get statistics
    const stats = {
      // Page views
      pageViewsToday: db.prepare(`
        SELECT COUNT(*) as count FROM page_views 
        WHERE DATE(created_at) = DATE('now')
      `).get() as { count: number },
      
      pageViewsWeek: db.prepare(`
        SELECT COUNT(*) as count FROM page_views 
        WHERE created_at >= ?
      `).get(weekAgo.toISOString()) as { count: number },
      
      pageViewsMonth: db.prepare(`
        SELECT COUNT(*) as count FROM page_views 
        WHERE created_at >= ?
      `).get(monthAgo.toISOString()) as { count: number },
      
      pageViewsTotal: db.prepare(`
        SELECT COUNT(*) as count FROM page_views
      `).get() as { count: number },

      // Contacts
      contactsToday: db.prepare(`
        SELECT COUNT(*) as count FROM contacts 
        WHERE DATE(created_at) = DATE('now')
      `).get() as { count: number },
      
      contactsWeek: db.prepare(`
        SELECT COUNT(*) as count FROM contacts 
        WHERE created_at >= ?
      `).get(weekAgo.toISOString()) as { count: number },
      
      contactsMonth: db.prepare(`
        SELECT COUNT(*) as count FROM contacts 
        WHERE created_at >= ?
      `).get(monthAgo.toISOString()) as { count: number },
      
      contactsTotal: db.prepare(`
        SELECT COUNT(*) as count FROM contacts
      `).get() as { count: number },
      
      contactsNew: db.prepare(`
        SELECT COUNT(*) as count FROM contacts WHERE status = 'new'
      `).get() as { count: number },

      // Appointments
      appointmentsToday: db.prepare(`
        SELECT COUNT(*) as count FROM appointments 
        WHERE DATE(created_at) = DATE('now')
      `).get() as { count: number },
      
      appointmentsWeek: db.prepare(`
        SELECT COUNT(*) as count FROM appointments 
        WHERE created_at >= ?
      `).get(weekAgo.toISOString()) as { count: number },
      
      appointmentsMonth: db.prepare(`
        SELECT COUNT(*) as count FROM appointments 
        WHERE created_at >= ?
      `).get(monthAgo.toISOString()) as { count: number },
      
      appointmentsTotal: db.prepare(`
        SELECT COUNT(*) as count FROM appointments
      `).get() as { count: number },
      
      appointmentsScheduled: db.prepare(`
        SELECT COUNT(*) as count FROM appointments WHERE status = 'scheduled'
      `).get() as { count: number },

      // Page views by path (top 10)
      topPages: db.prepare(`
        SELECT path, COUNT(*) as count 
        FROM page_views 
        GROUP BY path 
        ORDER BY count DESC 
        LIMIT 10
      `).all() as Array<{ path: string; count: number }>,

      // Daily page views (last 7 days)
      dailyPageViews: db.prepare(`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM page_views
        WHERE created_at >= ?
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `).all(weekAgo.toISOString()) as Array<{ date: string; count: number }>,

      // Daily contacts (last 7 days)
      dailyContacts: db.prepare(`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM contacts
        WHERE created_at >= ?
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `).all(weekAgo.toISOString()) as Array<{ date: string; count: number }>,

      // Daily appointments (last 7 days)
      dailyAppointments: db.prepare(`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM appointments
        WHERE created_at >= ?
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `).all(weekAgo.toISOString()) as Array<{ date: string; count: number }>,

      // Contacts by status
      contactsByStatus: db.prepare(`
        SELECT status, COUNT(*) as count
        FROM contacts
        GROUP BY status
      `).all() as Array<{ status: string; count: number }>,

      // Appointments by status
      appointmentsByStatus: db.prepare(`
        SELECT status, COUNT(*) as count
        FROM appointments
        GROUP BY status
      `).all() as Array<{ status: string; count: number }>,

      // Upcoming appointments (next 7 days)
      upcomingAppointments: db.prepare(`
        SELECT * FROM appointments
        WHERE status = 'scheduled' AND date >= DATE('now') AND date <= DATE('now', '+7 days')
        ORDER BY date ASC, time ASC
        LIMIT 10
      `).all() as Array<any>,
    }

    return NextResponse.json({
      pageViews: {
        today: stats.pageViewsToday.count,
        week: stats.pageViewsWeek.count,
        month: stats.pageViewsMonth.count,
        total: stats.pageViewsTotal.count,
        topPages: stats.topPages,
        daily: stats.dailyPageViews,
      },
      contacts: {
        today: stats.contactsToday.count,
        week: stats.contactsWeek.count,
        month: stats.contactsMonth.count,
        total: stats.contactsTotal.count,
        new: stats.contactsNew.count,
        daily: stats.dailyContacts,
        byStatus: stats.contactsByStatus,
      },
      appointments: {
        today: stats.appointmentsToday.count,
        week: stats.appointmentsWeek.count,
        month: stats.appointmentsMonth.count,
        total: stats.appointmentsTotal.count,
        scheduled: stats.appointmentsScheduled.count,
        daily: stats.dailyAppointments,
        byStatus: stats.appointmentsByStatus,
        upcoming: stats.upcomingAppointments,
      },
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
