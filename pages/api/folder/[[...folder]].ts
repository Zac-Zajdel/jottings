import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import folderSchema from 'validation/folderSchema'
import { createRouter } from 'next-connect'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get('/api/folder', get)
router.post('/api/folder', store)

/**
 * @desc Grabs folders from specific user
 */
export async function get(_req: NextApiRequest, res: NextApiResponse) {
  const folders = await prisma.folder.findMany({
    where: {
      userId: 1,
      deletedAt: null,
    },
  })

  res.status(200).json(folders)
}

/**
 * @desc Stores a new folder
 */
export async function store(req: NextApiRequest, res: NextApiResponse) {
  await folderSchema.validate(req.body)

  const { name } = req.body
  const newFolder = await prisma.folder.create({
    data: {
      name: name,
      userId: 1,
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
