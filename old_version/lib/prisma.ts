import { PrismaClient } from '@prisma/client'

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

// import { PrismaClient } from '@prisma/client'

// const prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV === 'development') global.prisma = prisma

// export default prisma
