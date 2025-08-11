import { db } from '@/lib/db'

export async function getHomePageData() {
  try {
    const [categories, featuredPrompts, stats] = await Promise.all([
      // Get categories with prompt counts
      db.category.findMany({
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
      }),
      
      // Get featured prompts (most liked and used)
      db.prompt.findMany({
        where: {
          isPublished: true
        },
        include: {
          category: true,
          author: {
            select: {
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
          { likes: 'desc' },
          { uses: 'desc' },
          { createdAt: 'desc' }
        ],
        take: 8
      }),

      // Get platform stats
      Promise.all([
        db.prompt.count({ where: { isPublished: true } }),
        db.user.count(),
        db.promptUse.count(),
        db.like.count()
      ])
    ])

    return {
      categories: categories.map(cat => ({
        ...cat,
        promptsCount: cat._count.prompts
      })),
      featuredPrompts: featuredPrompts.map(prompt => ({
        ...prompt,
        tags: prompt.tags ? JSON.parse(prompt.tags) : [],
        likesCount: prompt._count.promptLikes,
        usesCount: prompt._count.promptUses,
        favoritesCount: prompt._count.favorites
      })),
      stats: {
        totalPrompts: stats[0],
        totalUsers: stats[1],
        totalUses: stats[2],
        totalLikes: stats[3]
      }
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Return fallback data
    return {
      categories: [],
      featuredPrompts: [],
      stats: {
        totalPrompts: 0,
        totalUsers: 0,
        totalUses: 0,
        totalLikes: 0
      }
    }
  }
}
