import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const events = await db.event.findMany({
      include: {
        group: true,
        host: true,
        attendees: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })
    
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, date, location, theme, budget, groupId, hostId } = body

    const event = await db.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        theme,
        budget,
        groupId,
        hostId,
        attendees: {
          create: {
            userId: hostId,
            status: 'confirmed'
          }
        }
      },
      include: {
        group: true,
        host: true,
        attendees: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}