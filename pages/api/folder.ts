import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const folders = await getFolders()
      return res.status(200).json(folders)
    case 'POST':
      const folder = await createFolder(req)
      return res.status(200).json(folder)
  }
}

/**
 * @desc Grabs folders from specific user
 */
export async function getFolders() {
  return await prisma.folder.findMany({
    where: {
      userId: 1,
      deletedAt: null,
    },
  })
}

/**
 * @desc Grabs the first user from the database.
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
