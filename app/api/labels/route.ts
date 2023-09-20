import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

const labelCreateSchema = z.object({
  name: z.string().min(2).max(191), // todo - unique
  color: z.string().max(191),
  // todo - validate on
  model: z.string(),
  modelId: z.string(),
})

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Grab query params on filter
    const url = new URL(req.url)
    const search = url.searchParams.get("search")

    const labels = await db.label.findMany({
      select: {
        id: true,
        name: true,
        color: true,
      },
      where: {
        authorId: session.user.id,
        ...(
          search?.length
            ? { name: { contains: search } }
            : {}
        ),
      },
      take: 15,
    })

    return new Response(JSON.stringify(labels))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = labelCreateSchema.parse(json)

    // Create Label
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

    // Associate new label to model
    if (body.model) {
      const dynamicColumn = body.model === 'jot'
        ? 'jotId'
        : 'jotTemplateId'

        await db.labelAssociation.create({
          data: {
            authorId: session.user.id,
            labelId: label.id,
            [dynamicColumn]: body.modelId
          }
        })
    }

    return new Response(JSON.stringify(label))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}