import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone, action } = body // action: 'login' or 'signup'

    if (action === 'signup') {
      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
      }

      // Create new user
      const user = await db.user.create({
        data: {
          email,
          name,
          phone,
        }
      })

      return NextResponse.json({ 
        message: 'User created successfully',
        user: { id: user.id, email: user.email, name: user.name }
      }, { status: 201 })
    }

    if (action === 'login') {
      // Find user by email
      const user = await db.user.findUnique({
        where: { email }
      })

      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      // In a real app, you'd verify the password here
      // For now, we'll just return the user if they exist
      return NextResponse.json({ 
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name }
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}