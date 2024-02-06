import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const jotTemplateCreateSchema = z.object({
  title: z.string().min(2).max(191),
  content: z.string().optional(),
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

    const jotTemplates = await db.jotTemplate.findMany({
      select: {
        id: true,
        title: true,
        isPublished: true,
        createdAt: true
      },
      where: {
        workspaceId: session.user.activeWorkspaceId,
        ...(search ? { title: { contains: search as string } } : {}),
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    })

    return new Response(JSON.stringify(jotTemplates))
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
    const body = jotTemplateCreateSchema.parse(json)

    const post = await db.jotTemplate.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
        workspaceId: session.user.activeWorkspaceId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}