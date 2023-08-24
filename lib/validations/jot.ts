import * as z from "zod"

export const jotPatchSchema = z.object({
  title: z.string().min(2).max(191),
  content: z.any().optional(),
})
