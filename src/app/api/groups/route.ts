import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const groups = await db.group.findMany({
      include: {
        host: true,
        members: {
          include: {
            user: true
          }
        },
        _count: {
          select: {
            members: true,
            events: true
          }
        }
      }
    })
    
    return NextResponse.json(groups)
  } catch (error) {
    console.error('Error fetching groups:', error)
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, rules, maxMembers, monthlyAmount, hostId } = body

    const group = await db.group.create({
      data: {
        name,
        description,
        rules,
        maxMembers,
        monthlyAmount,
        hostId,
        members: {
          create: {
            userId: hostId,
            role: 'admin'
          }
        }
      },
      include: {
        host: true,
        members: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(group, { status: 201 })
  } catch (error) {
    console.error('Error creating group:', error)
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 })
  }
}