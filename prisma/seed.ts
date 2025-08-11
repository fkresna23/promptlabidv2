import { PrismaClient, PromptDifficulty, PromptType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const categories = [
    {
      name: 'Marketing & Sales',
      slug: 'marketing-sales',
      description: 'Prompts for marketing campaigns, sales copy, and customer engagement',
      icon: '📈',
      color: '#10B981'
    },
    {
      name: 'Content Creation',
      slug: 'content-creation',
      description: 'Prompts for blogs, articles, social media, and creative writing',
      icon: '✍️',
      color: '#8B5CF6'
    },
    {
      name: 'Programming & Code',
      slug: 'programming-code',
      description: 'Prompts for code generation, debugging, and technical documentation',
      icon: '💻',
      color: '#3B82F6'
    },
    {
      name: 'Business & Strategy',
      slug: 'business-strategy',
      description: 'Prompts for business planning, strategy, and professional communication',
      icon: '💼',
      color: '#F59E0B'
    },
    {
      name: 'Education & Learning',
      slug: 'education-learning',
      description: 'Prompts for teaching, learning, and educational content',
      icon: '🎓',
      color: '#EF4444'
    },
    {
      name: 'Personal Development',
      slug: 'personal-development',
      description: 'Prompts for self-improvement, productivity, and personal growth',
      icon: '🌱',
      color: '#06B6D4'
    },
    {
      name: 'Creative & Design',
      slug: 'creative-design',
      description: 'Prompts for creative projects, design thinking, and artistic endeavors',
      icon: '🎨',
      color: '#EC4899'
    },
    {
      name: 'Research & Analysis',
      slug: 'research-analysis',
      description: 'Prompts for research, data analysis, and information gathering',
      icon: '🔍',
      color: '#84CC16'
    }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    })
  }

  console.log('✅ Categories created')

  // Create sample admin user (you'll need to update this with actual Clerk user ID)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@promptlab.dev' },
    update: {},
    create: {
      clerkUserId: 'user_admin_sample', // Replace with actual Clerk ID
      email: 'admin@promptlab.dev',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      subscription: 'PREMIUM'
    }
  })

  console.log('✅ Admin user created')

  // Get marketing category for sample prompts
  const marketingCategory = await prisma.category.findUnique({
    where: { slug: 'marketing-sales' }
  })

  const contentCategory = await prisma.category.findUnique({
    where: { slug: 'content-creation' }
  })

  const programmingCategory = await prisma.category.findUnique({
    where: { slug: 'programming-code' }
  })

  // Create sample prompts
  if (marketingCategory && contentCategory && programmingCategory) {
    const samplePrompts = [
      {
        title: 'Email Marketing Campaign Creator',
        slug: 'email-marketing-campaign-creator',
        description: 'Generate compelling email marketing campaigns for any product or service',
        content: `Create a comprehensive email marketing campaign for [PRODUCT/SERVICE]. Include:

1. **Subject Lines**: 5 attention-grabbing subject lines
2. **Email Content**: 
   - Opening hook
   - Value proposition
   - Social proof
   - Clear call-to-action
3. **Follow-up Strategy**: 3-email sequence
4. **Personalization**: Ways to customize for different segments

Product/Service: [DESCRIBE YOUR PRODUCT/SERVICE]
Target Audience: [DESCRIBE YOUR AUDIENCE]
Campaign Goal: [SALES/AWARENESS/ENGAGEMENT]`,
        categoryId: marketingCategory.id,
        authorId: adminUser.id,
        difficulty: 'INTERMEDIATE' as const,
        type: 'BUSINESS' as const,
        isPremium: false,
        isPublished: true,
        tags: JSON.stringify(['email marketing', 'campaigns', 'sales', 'conversion']),
        likes: 45,
        uses: 230,
        views: 1250
      },
      {
        title: 'Blog Post SEO Optimizer',
        slug: 'blog-post-seo-optimizer',
        description: 'Create SEO-optimized blog posts that rank higher in search results',
        content: `Write an SEO-optimized blog post about [TOPIC]. Include:

**Article Structure:**
1. **Compelling Headline** (60 characters max)
2. **Meta Description** (155 characters max)
3. **Introduction** (hook + problem + solution preview)
4. **Main Content** (3-5 sections with H2/H3 headers)
5. **Conclusion** (summary + call-to-action)

**SEO Requirements:**
- Primary keyword: [MAIN KEYWORD]
- Secondary keywords: [RELATED KEYWORDS]
- Keyword density: 1-2%
- Internal/external links: 3-5 each
- Image alt text suggestions

**Content Guidelines:**
- Word count: 1500-2000 words
- Readability: Grade 8 level
- Include statistics and examples
- Add FAQ section if relevant

Topic: [YOUR TOPIC]
Target Keyword: [PRIMARY KEYWORD]
Audience: [TARGET AUDIENCE]`,
        categoryId: contentCategory.id,
        authorId: adminUser.id,
        difficulty: 'ADVANCED' as const,
        type: 'TEXT' as const,
        isPremium: true,
        isPublished: true,
        tags: JSON.stringify(['SEO', 'blog writing', 'content marketing', 'organic traffic']),
        likes: 78,
        uses: 156,
        views: 890
      },
      {
        title: 'React Component Generator',
        slug: 'react-component-generator',
        description: 'Generate reusable React components with TypeScript and best practices',
        content: `Create a React component with the following specifications:

**Component Details:**
- Name: [COMPONENT_NAME]
- Purpose: [COMPONENT_PURPOSE]
- Props: [LIST_PROPS_AND_TYPES]

**Requirements:**
1. **TypeScript**: Fully typed with interfaces
2. **Styling**: Use styled-components or CSS modules
3. **Accessibility**: ARIA labels and keyboard navigation
4. **Responsive**: Mobile-first design
5. **Testing**: Include Jest test cases
6. **Documentation**: JSDoc comments

**Additional Features:**
- Error handling and loading states
- Prop validation and default values
- Performance optimization (memo, callbacks)
- Storybook story template

**Code Structure:**
\`\`\`typescript
// Component interface
interface [ComponentName]Props {
  // Define props here
}

// Main component
export const [ComponentName]: React.FC<[ComponentName]Props> = ({ }) => {
  // Implementation
}

// Export default and named exports
export default [ComponentName]
\`\`\`

Component Name: [YOUR_COMPONENT_NAME]
Functionality: [DESCRIBE_WHAT_IT_DOES]
Props Needed: [LIST_THE_PROPS]`,
        categoryId: programmingCategory.id,
        authorId: adminUser.id,
        difficulty: 'EXPERT' as const,
        type: 'CODING' as const,
        isPremium: true,
        isPublished: true,
        tags: JSON.stringify(['React', 'TypeScript', 'components', 'frontend development']),
        likes: 123,
        uses: 89,
        views: 567
      },
      {
        title: 'Social Media Content Calendar',
        slug: 'social-media-content-calendar',
        description: 'Plan and create engaging social media content for the entire month',
        content: `Create a comprehensive social media content calendar for [BRAND/BUSINESS]:

**Calendar Overview:**
- Platform: [INSTAGRAM/LINKEDIN/TWITTER/FACEBOOK]
- Duration: 30 days
- Post frequency: [DAILY/3x WEEK/WEEKLY]
- Content mix: 70% value, 20% promotional, 10% personal

**Content Categories:**
1. **Educational Posts** (40%)
   - Tips and tutorials
   - Industry insights
   - How-to content

2. **Engaging Posts** (30%)
   - Questions and polls
   - Behind-the-scenes
   - User-generated content

3. **Promotional Posts** (20%)
   - Product features
   - Special offers
   - Testimonials

4. **Trending Content** (10%)
   - Memes and humor
   - Current events
   - Seasonal content

**For Each Post Include:**
- Caption (with hashtags)
- Visual description
- Best posting time
- Engagement strategy
- Call-to-action

Brand/Business: [YOUR_BRAND]
Target Audience: [YOUR_AUDIENCE]
Main Platform: [PRIMARY_PLATFORM]
Goals: [AWARENESS/ENGAGEMENT/SALES]`,
        categoryId: marketingCategory.id,
        authorId: adminUser.id,
        difficulty: 'BEGINNER' as const,
        type: 'CREATIVE' as const,
        isPremium: false,
        isPublished: true,
        tags: JSON.stringify(['social media', 'content planning', 'marketing strategy', 'engagement']),
        likes: 92,
        uses: 340,
        views: 1850
      }
    ]

    for (const prompt of samplePrompts) {
      await prisma.prompt.upsert({
        where: { slug: prompt.slug },
        update: prompt,
        create: prompt
      })
    }

    console.log('✅ Sample prompts created')
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
