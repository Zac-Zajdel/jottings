import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

const labelCreateSchema = z.object({
  name: z.string().min(2).max(191),
  color: z.string().max(191),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = labelCreateSchema.parse(json)

    const label = await db.label.create({
      data: {
        name: body.name,
        color: body.color,
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    // todo - Logic to create association

    return new Response(JSON.stringify(label))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}