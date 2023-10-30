const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.PostType.createMany({
      data: [
        { name: 'videos' },
        { name: 'images' },
        { name: 'tweets' },
        { name: 'articles' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default post types:', error);
  } finally {
    await db.$disconnect();
  }
}

main();