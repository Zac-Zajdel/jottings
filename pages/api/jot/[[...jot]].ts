import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { createJot } from 'validation/jotSchema'
import { createRouter } from 'next-connect'
import { User } from '@prisma/client'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get('/api/jot', get)
router.post('/api/jot', store)
router.put('/api/jot/:id', update)
router.delete('/api/jot/:id', destroy)

// todo - Move to helper function that will include all successful/error return API structure calls for front-end
// call it nextHelper and possibly make it a class?
/**
 *
 * @param req
 * @param res
 * @returns
 */
async function getUserSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session?.user) return res.status(401).json({ error: true, message: 'Unauthenticated' })

  return session.user
}

/**
 * @desc Grabs jots from specific user
 */
export async function get(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)

  const { isDeleted } = req.query

  const jots = await prisma.jot.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: user.id,
      ...(isDeleted === 'true' ? { NOT: { deletedAt: null } } : { deletedAt: null }),
    },
  })

  res.status(200).json(jots)
}

/**
 * @desc Creates a new jot.
 */
export async function store(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  await createJot.validate(req.body)

  const { title } = req.body
  const jot = await prisma.jot.create({
    data: {
      title: title,
      userId: user.id,
    },
  })

  res.status(200).json(jot)
}

/**
 * @desc Updates an existing jot.
 */
export async function update(req: NextApiRequest, res: NextApiResponse) {
  // todo - make sure this belongs to the user.
  const { jot } = req.body

  const updatedJot = await prisma.jot.update({
    where: {
      id: jot.id,
    },
    data: {
      isFavorite: jot.isFavorite,
      updatedAt: new Date(),
    },
  })

  res.status(200).json(updatedJot)
}

/**
 * @desc Deletes a jot.
 */
export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  // todo - make sure it belongs to the user.
  const { jot } = req.body

  const deletedJot = await prisma.jot.update({
    where: {
      id: jot.id,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  res.status(200).json(deletedJot)
}

export default router.handler({
  onError: (err: any, _req, res) => {
    res.status(500).end(err.message)
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found')
  },
})
