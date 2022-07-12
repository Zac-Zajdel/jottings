import { prisma } from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import jotSchema from 'validation/jotSchema'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // add schema
      const jots = await getJots(req)
      return res.status(200).json(jots)
    case 'POST':
      try {
        await jotSchema.validate(req.body)
        const jot = await createJot(req)
        return res.status(200).json(jot)
      } catch (e) {
        return res.status(400).json(e)
      }
    case 'PUT':
      try {
        const jot = await updateJot(req)
        return res.status(200).json(jot)
      } catch (e) {
        return res.status(400).json(e)
      }
  }
}

/**
 * @desc Grabs jots from specific user
 */
export async function getJots(req: NextApiRequest) {
  const { isDeleted } = req.query

  return await prisma.jot.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: 1,
      ...(isDeleted === 'true' ? { NOT: { deletedAt: null } } : { deletedAt: null }),
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

/**
 * @desc Updates a new information
 */
export async function updateJot(req: NextApiRequest) {
  const { jot } = req.body

  return await prisma.jot.update({
    where: {
      id: jot.id,
    },
    data: {
      isFavorite: jot.isFavorite,
    },
  })
}
