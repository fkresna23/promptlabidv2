import { db } from '@/lib/db'

export async function getAdminStats() {
  try {
    const [
      totalUsers,
      totalPrompts,
      publishedPrompts,
      premiumPrompts,
      totalLikes,
      totalUses,
      recentUsers,
      recentPrompts
    ] = await Promise.all([
      db.user.count(),
      db.prompt.count(),
      db.prompt.count({ where: { isPublished: true } }),
      db.prompt.count({ where: { isPremium: true } }),
      db.like.count(),
      db.promptUse.count(),
      db.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          imageUrl: true,
          createdAt: true,
          status: true,
          subscription: true
        }
      }),
      db.prompt.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              imageUrl: true
            }
          },
          category: {
            select: {
              name: true,
              color: true
            }
          }
        }
      })
    ])

    return {
      stats: {
        totalUsers,
        totalPrompts,
        publishedPrompts,
        premiumPrompts,
        totalLikes,
        totalUses
      },
      recentActivity: {
        users: recentUsers,
        prompts: recentPrompts
      }
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    throw new Error('Failed to fetch admin statistics')
  }
}

export async function getAllUsers() {
  try {
    const users = await db.user.findMany({
      include: {
        _count: {
          select: {
            prompts: true,
            likes: true,
            uses: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return users.map(user => ({
      ...user,
      promptsCount: user._count.prompts,
      likesCount: user._count.likes,
      usesCount: user._count.uses
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}

export async function getAllPrompts() {
  try {
    const prompts = await db.prompt.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true
          }
        },
        category: {
          select: {
            name: true,
            color: true
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
      orderBy: { createdAt: 'desc' }
    })

    return prompts.map(prompt => ({
      ...prompt,
      tags: prompt.tags ? JSON.parse(prompt.tags) : [],
      likesCount: prompt._count.promptLikes,
      usesCount: prompt._count.promptUses,
      favoritesCount: prompt._count.favorites
    }))
  } catch (error) {
    console.error('Error fetching prompts:', error)
    throw new Error('Failed to fetch prompts')
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      include: {
        _count: {
          select: {
            prompts: {
              where: {
                isPublished: true
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return categories.map(category => ({
      ...category,
      promptsCount: category._count.prompts
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }
}
