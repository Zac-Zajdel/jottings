import { z } from 'zod'

export const jotIndex = z.object({
  isDeleted: z.string(),
})

export const jotStore = z.object({
  title: z.string().min(1).max(255),
})

export const jotUpdate = z.object({
  jot: z.object({
    id: z.number(),
    userId: z.number(),
    title: z.string().min(1).max(255),
    // jot - todo we have to change this schema so forget about this.
    isFavorite: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  }),
})
