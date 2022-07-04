import { prisma } from '../lib/prisma'

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  await prisma.jot.create({
    data: {
      userId: user.id,
      title: 'Rough Draft',
      jot: {
        hello: 'world',
        mother: 'nature',
      },
    },
  })

  await prisma.folder.upsert({
    where: { name: 'Course Work' },
    update: {},
    create: {
      userId: user.id,
      name: 'Course Work',
    },
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
