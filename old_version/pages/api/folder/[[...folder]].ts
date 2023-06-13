import { folderStore } from '@/formRequests/folder'
import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { User } from '@prisma/client'
import { getUserSession } from '../helpers/getUserSession'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get('/api/folder', index)
router.post('/api/folder', store)

/**
 * @desc Grabs folders from specific user
 */
export async function index(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
  })

  res.status(200).json(folders)
}

/**
 * @desc Stores a new folder
 */
export async function store(req: NextApiRequest, res: NextApiResponse) {
  const user: User = await getUserSession(req, res)
  const payload = folderStore.parse(req.body)

  const newFolder = await prisma.folder.create({
    data: {
      name: payload.name,
      userId: user.id,
    },
  })

  res.status(200).json(newFolder)
}

export default router.handler({
  onError: (err: any, _req, res) => {
    res.status(500).end(err.message)
  },
  onNoMatch: (_req, res) => {
    res.status(404).end('Page is not found')
  },
})
