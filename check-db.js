const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Categories in database:');
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { prompts: true }
      }
    },
    orderBy: { name: 'asc' }
  });
  
  categories.forEach(cat => {
    console.log(`- ${cat.name} (${cat.slug}) - ${cat._count.prompts} prompts`);
    console.log(`  Icon: ${cat.icon}`);
    console.log(`  Description: ${cat.description}`);
    console.log(`  Color: ${cat.color}`);
    console.log('');
  });

  console.log('🔍 Prompts in database:');
  const prompts = await prisma.prompt.findMany({
    include: {
      category: true,
      author: true
    },
    orderBy: { createdAt: 'desc' }
  });
  
  prompts.forEach(prompt => {
    console.log(`- ${prompt.title} (${prompt.slug})`);
    console.log(`  Category: ${prompt.category.name}`);
    console.log(`  Author: ${prompt.author.firstName} ${prompt.author.lastName}`);
    console.log(`  Published: ${prompt.isPublished}`);
    console.log(`  Premium: ${prompt.isPremium}`);
    console.log('');
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
