import { z } from 'zod'

export const folderStore = z.object({
  name: z.string().min(1).max(255),
})
