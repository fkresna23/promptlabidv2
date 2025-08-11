import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function POST() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user already exists in database
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: userId }
    })

    if (existingUser) {
      // Update existing user
      const updatedUser = await db.user.update({
        where: { clerkUserId: userId },
        data: {
          email: user.emailAddresses[0]?.emailAddress || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          imageUrl: user.imageUrl || ''
        }
      })
      
      return NextResponse.json({ user: updatedUser })
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: userId,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        imageUrl: user.imageUrl || '',
        role: 'USER',
        status: 'ACTIVE',
        subscription: 'FREE'
      }
    })

    return NextResponse.json({ user: newUser }, { status: 201 })

  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
