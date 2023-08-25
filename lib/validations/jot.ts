import * as z from "zod"

export const jotPatchSchema = z.object({
  title: z.string().min(2).max(191),
  content: z.any().optional(),
  status: z.enum(["Draft", "In-Progress", "Completed"]),
  priority: z.union([
    z.literal('Low'),
    z.literal('Medium'),
    z.literal('High'),
    z.literal('Highest'),
    z.literal(null),
  ]).optional(),
})
