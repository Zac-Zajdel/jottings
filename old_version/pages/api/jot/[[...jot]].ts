import { jotIndex, jotStore, jotUpdate } from '@/formRequests/jot'
import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { User } from '@prisma/client'
import { getUserSession } from '../helpers/getUserSession'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get('/api/jot', index)
router.post('/api/jot', store)
router.put('/api/jot/:id', update)
router.delete('/api/jot/:id', destroy)

/**
 * @desc Grabs jots from specific user
 */
export async function index(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  const payload = jotIndex.parse(req.query)

  const jots = await prisma.jot.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: user.id,
      ...(payload.isDeleted === 'true'
        ? { NOT: { deletedAt: null } }
        : { deletedAt: null }),
    },
  })

  res.status(200).json(jots)
}

/**
 * @desc Creates a new jot.
 */
export async function store(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  const payload = jotStore.parse(req.body)

  const jot = await prisma.jot.create({
    data: {
      title: payload.title,
      userId: user.id,
    },
  })

  res.status(200).json(jot)
}

/**
 * @desc Updates an existing jot.
 */
export async function update(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  const payload = jotUpdate.parse(req.body)

  const jot = await prisma.jot.findFirst({
    where: {
      id: payload.jot.id,
      userId: user.id,
    },
  })

  if (jot) {
    const updatedJot = await prisma.jot.update({
      where: {
        id: payload.jot.id,
      },
      data: {
        isFavorite: payload.jot.isFavorite,
        updatedAt: new Date(),
      },
    })

    res.status(200).json(updatedJot)
  } else {
    res
      .status(401)
      .json({ error: true, message: 'You are not the owner of this Jot.' })
  }
}

/**
 * @desc Deletes a jot.
 */
export async function destroy(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  const payload = req.body

  const jot = await prisma.jot.findFirst({
    where: {
      id: payload.jot.id,
      userId: user.id,
    },
  })

  if (jot) {
    const deletedJot = await prisma.jot.update({
      where: {
        id: payload.jot.id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    })

    res.status(200).json(deletedJot)
  } else {
    res
      .status(401)
      .json({ error: true, message: 'You are not the owner of this Jot.' })
  }
}

export default router.handler({
  onError: (err: any, _req, res) => {
    res.status(500).end(err.message)
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found')
  },
})
