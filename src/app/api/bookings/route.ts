import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const groupId = searchParams.get('groupId')

    const where = userId || groupId ? {
      ...(userId && { userId }),
      ...(groupId && { groupId })
    } : {}

    const bookings = await db.booking.findMany({
      where,
      include: {
        service: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, userId, groupId, eventDate, specialRequests } = body

    // Create booking
    const booking = await db.booking.create({
      data: {
        serviceId,
        userId,
        groupId,
        eventDate: new Date(eventDate),
        specialRequests,
        status: 'pending'
      },
      include: {
        service: true
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}