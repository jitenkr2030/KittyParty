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

    const contributions = await db.contribution.findMany({
      where,
      include: {
        user: true,
        group: true,
        payment: true
      },
      orderBy: {
        month: 'desc'
      }
    })
    
    return NextResponse.json(contributions)
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, month, userId, groupId, paymentMethod } = body

    // Create payment first
    const payment = await db.payment.create({
      data: {
        amount,
        method: paymentMethod,
        status: 'completed',
        userId
      }
    })

    // Then create contribution
    const contribution = await db.contribution.create({
      data: {
        amount,
        month,
        status: 'paid',
        paidAt: new Date(),
        userId,
        groupId,
        paymentId: payment.id
      },
      include: {
        user: true,
        group: true,
        payment: true
      }
    })

    return NextResponse.json(contribution, { status: 201 })
  } catch (error) {
    console.error('Error creating contribution:', error)
    return NextResponse.json({ error: 'Failed to create contribution' }, { status: 500 })
  }
}