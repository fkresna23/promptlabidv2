import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { Prisma, PromptDifficulty, PromptType } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const difficulty = searchParams.get('difficulty')
    const type = searchParams.get('type')
    const isPremium = searchParams.get('isPremium')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.PromptWhereInput = {
      isPublished: true
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { content: { contains: search } }
      ]
    }

    if (difficulty) {
      where.difficulty = difficulty as PromptDifficulty
    }

    if (type) {
      where.type = type as PromptType
    }

    if (isPremium !== null) {
      where.isPremium = isPremium === 'true'
    }

    const [prompts, total] = await Promise.all([
      db.prompt.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              imageUrl: true
            }
          },
          _count: {
            select: {
              promptLikes: true,
              promptUses: true,
              favorites: true
            }
          }
        },
        orderBy: [
          { isPremium: 'desc' },
          { likes: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      db.prompt.count({ where })
    ])

    return NextResponse.json({
      prompts: prompts.map(prompt => ({
        ...prompt,
        tags: prompt.tags ? JSON.parse(prompt.tags) : [],
        likesCount: prompt._count.promptLikes,
        usesCount: prompt._count.promptUses,
        favoritesCount: prompt._count.favorites
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  console.log('🔥 POST /api/prompts called - Database integration working!')
  
  try {
    const { userId } = await auth()
    
    console.log('👤 User ID from auth:', userId)
    
    if (!userId) {
      console.log('❌ No user ID - unauthorized')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user exists in database
    const user = await db.user.findUnique({
      where: { clerkUserId: userId }
    })

    console.log('🔍 User found in database:', user ? 'Yes' : 'No')

    if (!user) {
      console.log('❌ User not found in database')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    console.log('📨 Request body received:', body)
    const {
      title,
      description,
      content,
      categoryId,
      tags,
      isPremium,
      difficulty,
      type
    } = body

    // Validate required fields
    if (!title || !description || !content || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if slug already exists
    const existingPrompt = await db.prompt.findUnique({
      where: { slug }
    })

    if (existingPrompt) {
      return NextResponse.json(
        { error: 'A prompt with this title already exists' },
        { status: 409 }
      )
    }

    const prompt = await db.prompt.create({
      data: {
        title,
        description,
        content,
        slug,
        categoryId,
        authorId: user.id,
        tags: tags ? JSON.stringify(tags) : null,
        isPremium: isPremium || false,
        difficulty: difficulty || 'BEGINNER',
        type: type || 'TEXT',
        isPublished: user.role === 'ADMIN' // Auto-publish for admins
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        }
      }
    })

    return NextResponse.json({
      ...prompt,
      tags: prompt.tags ? JSON.parse(prompt.tags) : []
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating prompt:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
