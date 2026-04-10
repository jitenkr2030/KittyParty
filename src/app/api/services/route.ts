import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'food' or 'decoration'

    const services = await db.service.findMany({
      where: {
        type: type as 'food' | 'decoration' || undefined,
        isActive: true
      },
      orderBy: {
        price: 'asc'
      }
    })
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, type, price, duration, includes } = body

    const service = await db.service.create({
      data: {
        name,
        description,
        type,
        price,
        duration,
        includes: typeof includes === 'object' ? JSON.stringify(includes) : includes
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}