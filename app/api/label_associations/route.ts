import * as z from "zod"
import { db } from "@/lib/db"
import { auth } from "@/auth"
import { type NextRequest } from 'next/server'

const associationRequest = z.object({
  labelId: z.string(),
  model: z.union([
    z.literal('jots'),
    z.literal('templates'),
  ]),
  modelId: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = await associationRequest.parseAsync(json)

    const dynamicColumn = body.model === 'jots' 
      ? 'jotId'
      : 'jotTemplateId';

    const alreadyAssociated = await db.labelAssociation.findFirst({
      where: {
        labelId: body.labelId,
        [dynamicColumn]: body.modelId,
      },
      select: {
        id: true,
      },
    })
    if (alreadyAssociated) {
      return new Response(JSON.stringify([{message: "Label is already associated"}]), { status: 403 })
    }

    // Create Label Association
    const label = await db.labelAssociation.create({
      data: {
        authorId: session.user.id,
        labelId: body.labelId,
        [dynamicColumn]: body.modelId,
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