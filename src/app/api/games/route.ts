import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const games = await db.game.findMany({
      include: {
        event: true,
        sessions: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            sessions: true
          }
        }
      }
    })
    
    return NextResponse.json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, config, eventId } = body

    const game = await db.game.create({
      data: {
        name,
        type,
        config,
        eventId
      },
      include: {
        event: true
      }
    })

    return NextResponse.json(game, { status: 201 })
  } catch (error) {
    console.error('Error creating game:', error)
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 })
  }
}