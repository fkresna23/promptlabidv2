const { db } = require('./src/lib/db');

async function testHomepageData() {
  try {
    console.log('🔍 Testing homepage data function...');
    
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
    ]);

    console.log('✅ Categories:', categories.length);
    console.log('✅ Featured prompts:', featuredPrompts.length);
    console.log('✅ Stats:', stats);
    
    console.log('\n📝 Sample prompt:', featuredPrompts[0]);
    console.log('\n📂 Sample category:', categories[0]);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await db.$disconnect();
  }
}

testHomepageData();
