import { prisma } from './../lib/prisma'
import { object, string } from 'yup'
import { Folder } from '@prisma/client'

const folderSchema = object({
  name: string()
    .required()
    .min(1)
    .max(255)
    .test(
      'unique',
      'Folder Name must be unique',
      async (name) => name !== (await uniqueName(name)),
    ),
})

const uniqueName = async (name: string | undefined) => {
  const folder: Partial<Folder> | null = await prisma.folder.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
    },
  })
  return folder?.name
}

export default folderSchema
