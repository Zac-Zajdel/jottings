import { prisma } from '../lib/prisma'

async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
    },
  })

  await prisma.jots.upsert({
    where: { title: 'Rough Draft' },
    update: {},
    create: {
      userId: user.id,
      title: 'Rough Draft',
      jot: {
        hello: 'world',
        mother: 'nature',
      },
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
