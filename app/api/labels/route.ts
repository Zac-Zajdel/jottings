import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"

async function uniqueLabel(name: string) {
  const session = await getServerSession(authOptions)
  return !await db.label.findFirst({
    where: {
      name: name,
      authorId: session?.user.id,
    },
  })
}

const labelCreateSchema = z.object({
  name: z.string().refine(uniqueLabel, val => ({
    message: `Label ${val} already exists.`,
  })),
  color: z.string().max(191),
  model: z.union([
    z.literal('jots'),
    z.literal('templates'),
  ]),
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
    const model = url.searchParams.get("model")
    const modelId = url.searchParams.get("modelId")

    const dynamicColumn = model == 'jots'
      ? 'jotId'
      : 'jotTemplateId'

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
        associations: {
          none: {
            [dynamicColumn]: modelId as string,
          },
        },
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
    const body = await labelCreateSchema.parseAsync(json)

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
      const dynamicColumn = body.model === 'jots'
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