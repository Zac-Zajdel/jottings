import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import folderSchema from 'validation/folderSchema'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const folders = await getFolders()
      return res.status(200).json(folders)
    case 'POST':
      try {
        await folderSchema.validate(req.body)
        const folder = await createFolder(req)
        return res.status(200).json(folder)
      } catch (e) {
        return res.status(400).json(e)
      }
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
