import { AIPrompt, Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Sales',
    description: 'Sales scripts, objection handling, and conversion strategies',
    icon: '💰',
    count: 42
  },
  {
    id: '2',
    name: 'Education',
    description: 'Teaching materials, course creation, and learning frameworks',
    icon: '�',
    count: 38
  },
  {
    id: '3',
    name: 'Solopreneurs',
    description: 'Solo business strategies, automation, and growth hacks',
    icon: '🚀',
    count: 35
  },
  {
    id: '4',
    name: 'SEO',
    description: 'Search optimization, keyword research, and content ranking',
    icon: '�',
    count: 29
  },
  {
    id: '5',
    name: 'Productivity',
    description: 'Time management, workflow optimization, and efficiency tips',
    icon: '⚡',
    count: 33
  },
  {
    id: '6',
    name: 'Writing',
    description: 'Copywriting, content creation, and storytelling techniques',
    icon: '✍️',
    count: 46
  },
  {
    id: '7',
    name: 'Business',
    description: 'Business planning, strategy, and management insights',
    icon: '💼',
    count: 31
  },
  {
    id: '8',
    name: 'Marketing',
    description: 'Digital marketing, campaigns, and brand positioning',
    icon: '�',
    count: 39
  }
];

export const samplePrompts: AIPrompt[] = [
  {
    id: '1',
    title: 'High-Converting Sales Email Sequence',
    description: 'Create a 7-email sales sequence that nurtures leads and drives conversions with proven psychological triggers',
    content: `Create a high-converting 7-email sales sequence for [PRODUCT/SERVICE]:

**Email 1 - Welcome & Value Delivery** (Day 1):
- Subject: "Welcome! Here's your [FREE RESOURCE]"
- Deliver promised lead magnet
- Set expectations for the sequence
- Include social proof

**Email 2 - Problem Identification** (Day 3):
- Subject: "The #1 mistake [TARGET AUDIENCE] make with [TOPIC]"
- Identify pain points your audience faces
- Share relatable story or case study
- Hint at solution without selling

**Email 3 - Solution Introduction** (Day 5):
- Subject: "How [CUSTOMER NAME] achieved [SPECIFIC RESULT]"
- Present your solution through customer success story
- Include specific metrics and outcomes
- Build credibility and trust

**Email 4 - Social Proof & Urgency** (Day 7):
- Subject: "Only [X] spots left for [OFFER]"
- Stack multiple testimonials
- Create scarcity and urgency
- Include risk reversal guarantee

**Email 5 - Direct Sales Pitch** (Day 9):
- Subject: "Ready to [ACHIEVE DESIRED OUTCOME]?"
- Clear value proposition
- Detailed benefits (not features)
- Strong call-to-action

**Email 6 - Objection Handling** (Day 11):
- Subject: "But what if [COMMON OBJECTION]?"
- Address top 3 objections
- Provide reassurance and proof
- Reinforce money-back guarantee

**Email 7 - Final Call** (Day 13):
- Subject: "Last chance: [OFFER] expires tonight"
- Final urgency push
- Recap all benefits
- Easy purchase process

Include personalization tokens and A/B testing variations for each email.`,
    category: 'Sales',
    tags: ['email marketing', 'sales funnel', 'conversion', 'automation'],
    isPremium: true,
    author: 'Sales Expert',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    likes: 542,
    uses: 1847,
    difficulty: 'Advanced',
    type: 'Universal'
  },
  {
    id: '2',
    title: 'Complete Course Curriculum Builder',
    description: 'Design comprehensive educational courses with learning objectives, modules, and assessments',
    content: `Create a complete course curriculum for: [COURSE TOPIC]

**Course Overview:**
- Course Title: [TITLE]
- Target Audience: [AUDIENCE DESCRIPTION]
- Duration: [X WEEKS/HOURS]
- Learning Format: [ONLINE/HYBRID/IN-PERSON]

**Learning Objectives:**
By the end of this course, students will be able to:
1. [SPECIFIC MEASURABLE OBJECTIVE 1]
2. [SPECIFIC MEASURABLE OBJECTIVE 2]
3. [SPECIFIC MEASURABLE OBJECTIVE 3]
4. [SPECIFIC MEASURABLE OBJECTIVE 4]

**Module Structure:**

**Module 1: Foundation & Fundamentals**
- Learning Objectives: [SPECIFIC TO MODULE]
- Key Concepts: [LIST 3-5 CONCEPTS]
- Activities: [PRACTICAL EXERCISES]
- Assessment: [QUIZ/PROJECT/ASSIGNMENT]
- Duration: [TIME ALLOCATION]

**Module 2: [INTERMEDIATE CONCEPTS]**
- Learning Objectives: [BUILD ON MODULE 1]
- Key Concepts: [DEEPER CONCEPTS]
- Activities: [HANDS-ON PRACTICE]
- Assessment: [PRACTICAL APPLICATION]
- Duration: [TIME ALLOCATION]

**Module 3: [ADVANCED APPLICATION]**
- Learning Objectives: [SYNTHESIS & APPLICATION]
- Key Concepts: [COMPLEX TOPICS]
- Activities: [REAL-WORLD PROJECTS]
- Assessment: [COMPREHENSIVE PROJECT]
- Duration: [TIME ALLOCATION]

**Final Assessment:**
- Capstone Project: [DESCRIPTION]
- Evaluation Criteria: [RUBRIC]
- Certification Requirements: [STANDARDS]

**Resources & Materials:**
- Required Readings: [LIST]
- Supplementary Materials: [OPTIONAL RESOURCES]
- Tools & Software: [REQUIREMENTS]
- Support Materials: [TEMPLATES/GUIDES]

Include engagement strategies, discussion prompts, and differentiated learning approaches.`,
    category: 'Education',
    tags: ['curriculum design', 'learning objectives', 'course creation', 'assessment'],
    isPremium: false,
    author: 'Education Specialist',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
    likes: 387,
    uses: 923,
    difficulty: 'Intermediate',
    type: 'Universal'
  },
  {
    id: '3',
    title: 'Solopreneur Business Launch Blueprint',
    description: 'Complete roadmap for launching a solo business from idea validation to first customers',
    content: `Create a comprehensive business launch blueprint for solopreneurs:

**Phase 1: Idea Validation (Weeks 1-2)**
- Market Research Framework:
  - Identify target market pain points
  - Analyze competitor landscape
  - Conduct customer interviews (minimum 20)
  - Validate demand through pre-sales/surveys

**Phase 2: MVP Development (Weeks 3-6)**
- Minimum Viable Product Strategy:
  - Core feature identification
  - No-code/low-code tools selection
  - Build vs. outsource decision matrix
  - Beta testing plan with 10-50 users

**Phase 3: Brand & Online Presence (Weeks 7-8)**
- Brand Foundation:
  - Brand positioning statement
  - Visual identity basics
  - Domain and hosting setup
  - Social media presence establishment

**Phase 4: Marketing System Setup (Weeks 9-10)**
- Customer Acquisition Channels:
  - Content marketing strategy
  - Email list building system
  - Social media automation
  - SEO foundation setup

**Phase 5: Sales & Operations (Weeks 11-12)**
- Revenue Generation:
  - Pricing strategy framework
  - Sales process automation
  - Customer onboarding system
  - Basic financial tracking

**Phase 6: Launch & Scale (Weeks 13-16)**
- Go-to-Market Strategy:
  - Launch sequence planning
  - PR and outreach campaign
  - Customer feedback collection
  - Iteration and improvement plan

**Tools & Resources:**
- Recommended no-code tools
- Essential apps and software
- Budget allocation guide
- Time management templates

**Success Metrics:**
- Revenue targets by month
- Customer acquisition goals
- Key performance indicators
- Growth milestones

Target: Go from idea to first paying customers in 90 days or less.`,
    category: 'Solopreneurs',
    tags: ['business launch', 'validation', 'MVP', 'automation'],
    isPremium: true,
    author: 'Solopreneur Coach',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-25',
    likes: 429,
    uses: 756,
    difficulty: 'Advanced',
    type: 'Universal'
  },
  {
    id: '4',
    title: 'SEO Content Optimization Framework',
    description: 'Comprehensive SEO strategy for creating high-ranking content that converts visitors into customers',
    content: `Create an SEO-optimized content strategy for: [WEBSITE/BUSINESS]

**Keyword Research & Strategy:**
- Primary Keyword: [MAIN TARGET KEYWORD]
- Secondary Keywords: [5-7 SUPPORTING KEYWORDS]
- Long-tail Keywords: [10-15 SPECIFIC PHRASES]
- Search Intent Analysis: [INFORMATIONAL/COMMERCIAL/TRANSACTIONAL]

**Content Optimization Checklist:**

**On-Page SEO Elements:**
- Title Tag: [60 characters max, include primary keyword]
- Meta Description: [150-160 characters, compelling + keyword]
- H1 Tag: [One per page, include primary keyword naturally]
- H2/H3 Structure: [Logical hierarchy with secondary keywords]
- URL Structure: [Short, descriptive, keyword-rich]

**Content Structure:**
- Introduction (150-200 words):
  - Hook with compelling statistic or question
  - Primary keyword in first 100 words
  - Clear value proposition

- Main Content Sections:
  - Use secondary keywords in subheadings
  - Include LSI (Latent Semantic Indexing) keywords
  - Add internal links to related content
  - Include external links to authoritative sources

**Technical SEO Requirements:**
- Image optimization: [Alt text, file names, compression]
- Page speed optimization: [Core Web Vitals compliance]
- Mobile responsiveness: [Mobile-first indexing ready]
- Schema markup: [Structured data implementation]

**Content Enhancement:**
- Featured snippets optimization
- Related questions targeting (People Also Ask)
- Video/audio content integration
- Interactive elements (calculators, quizzes)

**Link Building Strategy:**
- Internal linking plan
- External outreach targets
- Guest posting opportunities
- Resource page inclusions

**Performance Tracking:**
- Target keywords ranking positions
- Organic traffic growth metrics
- Click-through rates (CTR)
- Conversion rate optimization

Expected Results: Top 10 rankings within 3-6 months for target keywords.`,
    category: 'SEO',
    tags: ['SEO optimization', 'keyword research', 'content strategy', 'rankings'],
    isPremium: false,
    author: 'SEO Specialist',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-28',
    likes: 634,
    uses: 2156,
    difficulty: 'Intermediate',
    type: 'Universal'
  },
  {
    id: '5',
    title: 'Productivity System Implementation',
    description: 'Build a comprehensive productivity system that maximizes output while maintaining work-life balance',
    content: `Design a complete productivity system for: [ROLE/PROFESSION]

**Core Productivity Framework:**

**1. Time Management System:**
- Time blocking methodology
- Priority matrix (Eisenhower Matrix)
- Daily/weekly/monthly planning cycles
- Energy management throughout the day

**2. Task Management Workflow:**
- Capture system for all inputs
- Processing workflow (2-minute rule)
- Organization by context and priority
- Review cycles (daily, weekly, monthly)

**3. Digital Tools Setup:**
- Primary task manager: [RECOMMENDED TOOL]
- Calendar integration system
- Note-taking and knowledge management
- Automation tools and workflows

**4. Daily Routines:**

**Morning Routine (30-60 minutes):**
- Mindfulness/meditation (10 minutes)
- Goal review and intention setting
- Top 3 priorities identification
- Energy optimization (exercise/nutrition)

**Work Blocks:**
- Deep work sessions (90-120 minutes)
- Break intervals (15-30 minutes)
- Administrative batching (60 minutes)
- Communication windows (30 minutes, 2x daily)

**Evening Routine (20-30 minutes):**
- Day completion review
- Next day preparation
- Accomplishment acknowledgment
- Transition to personal time

**5. Weekly Planning Process:**
- Weekly review and planning session
- Goal progress assessment
- Calendar optimization
- System refinement and adjustment

**6. Productivity Metrics:**
- Output quality measurements
- Time allocation tracking
- Energy level monitoring
- Work-life balance indicators

**7. Common Obstacles & Solutions:**
- Procrastination countermeasures
- Interruption management strategies
- Overwhelm prevention techniques
- Perfectionism management

**Implementation Plan:**
- Week 1: Tool setup and basic routines
- Week 2: Workflow integration
- Week 3: Habit formation focus
- Week 4: System optimization

Expected Outcome: 30-50% increase in meaningful output with reduced stress.`,
    category: 'Productivity',
    tags: ['time management', 'productivity system', 'workflow optimization', 'habits'],
    isPremium: true,
    author: 'Productivity Expert',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-30',
    likes: 721,
    uses: 1543,
    difficulty: 'Intermediate',
    type: 'Universal'
  },
  {
    id: '6',
    title: 'Persuasive Copywriting Formula',
    description: 'Master copywriting framework for creating compelling content that drives action and conversions',
    content: `Create persuasive copy using the AIDA-PAS framework for: [PRODUCT/SERVICE/CAMPAIGN]

**A.I.D.A. Structure:**

**ATTENTION - Hook Your Audience**
- Headline formulas that stop the scroll:
  - "How to [ACHIEVE DESIRED OUTCOME] in [TIME FRAME]"
  - "The [NUMBER] [THING] That Will [BENEFIT]"
  - "[SHOCKING STATISTIC] About [TOPIC]"
  - "Stop [DOING WRONG THING]. Do This Instead."

**INTEREST - Build Engagement**
- Story elements that create connection:
  - Customer transformation stories
  - Personal struggles and breakthroughs
  - Industry insider secrets
  - Counterintuitive insights

**DESIRE - Amplify Want**
- Benefit amplification techniques:
  - Paint the "after" picture vividly
  - Stack multiple benefits
  - Use sensory language
  - Create urgency and scarcity

**ACTION - Drive Conversion**
- Call-to-action optimization:
  - Action-oriented verbs
  - Benefit-focused language
  - Risk reversal elements
  - Clear next steps

**P.A.S. Integration:**

**PROBLEM Identification**
- Agitate pain points:
  - Current frustrations and challenges
  - Cost of inaction (emotional and financial)
  - Failed previous attempts
  - Industry misconceptions

**AGITATION Amplification**
- Emotional intensifiers:
  - Time-sensitive consequences
  - Competitive disadvantages
  - Personal/professional impact
  - Future regret scenarios

**SOLUTION Presentation**
- Your offer as the bridge:
  - Unique value proposition
  - Proof elements (testimonials, case studies)
  - Feature-to-benefit translations
  - Risk mitigation guarantees

**Advanced Copywriting Techniques:**
- Psychological triggers (social proof, authority, reciprocity)
- Power words and emotional language
- Objection handling within copy
- Scarcity and urgency tactics
- Social proof integration

**Copy Optimization Checklist:**
- Benefit-focused headlines and subheadlines
- Scannable format with bullet points
- Multiple call-to-action placements
- Mobile-optimized formatting
- A/B testing variations

**Industry-Specific Adaptations:**
- B2B vs. B2C language differences
- Technical vs. emotional appeals
- Professional vs. casual tone
- Industry jargon considerations

Apply this framework to emails, sales pages, ads, and social media content.`,
    category: 'Writing',
    tags: ['copywriting', 'persuasion', 'conversion', 'marketing copy'],
    isPremium: false,
    author: 'Copywriting Expert',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-26',
    likes: 583,
    uses: 1897,
    difficulty: 'Beginner',
    type: 'Universal'
  }
];
