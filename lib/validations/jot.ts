import * as z from "zod"

export const jotPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
})
