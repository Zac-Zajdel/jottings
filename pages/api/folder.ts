import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const folder = createFolder(req)
  return res.status(200).json(folder)
}

/**
 * Grabs the first user from the database.
 */
export async function createFolder(req: NextApiRequest) {
  const { name } = req.body
  return await prisma.folder.create({
    data: {
      name: name,
      userId: 1,
    },
  })
}
