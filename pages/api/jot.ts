import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import folderSchema from 'validation/folderSchema'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const jots = await getJots()
      return res.status(200).json(jots)
    case 'POST':
      try {
        await folderSchema.validate(req.body)
        const jot = await createJot(req)
        return res.status(200).json(jot)
      } catch (e) {
        return res.status(400).json(e)
      }
  }
}

/**
 * @desc Grabs jots from specific user
 */
export async function getJots() {
  return await prisma.jot.findMany({
    where: {
      userId: 1,
      deletedAt: null,
    },
  })
}

/**
 * @desc Creates a new jot.
 */
export async function createJot(req: NextApiRequest) {
  const { title } = req.body
  return await prisma.jot.create({
    data: {
      title: title,
      userId: 1,
    },
  })
}
