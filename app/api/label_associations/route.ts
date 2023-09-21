import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

const associationRequest = z.object({
  labelId: z.string(),
  model: z.string(),
  modelId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = await associationRequest.parseAsync(json)

    // Create Label
    const label = await db.labelAssociation.create({
      data: {
        authorId: session.user.id,
        labelId: body.labelId,
        [body.model === 'jots' ? 'jotId' : 'jotTemplateId']: body.modelId,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(label))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}