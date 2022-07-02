import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(_: NextApiRequest, res: NextApiResponse) {
  const user = await getUser()
  return res.status(400).json(user)
}

/**
 * Grabs the first user from the database.
 */
export async function getUser() {
  const user = await prisma.user.findFirst()
  return user
}
