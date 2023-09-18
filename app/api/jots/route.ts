import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { JotTemplate } from "@prisma/client"
import { getServerSession } from "next-auth/next"

const jotCreateSchema = z.object({
  title: z.string().min(2).max(191),
  content: z.string().optional(),
  templateId: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const jots = await db.jot.findMany({
      select: {
        id: true,
        title: true,
        published: true,
        status: true,
        priority: true,
        createdAt: true,
      },
      where: {
        authorId: session.user.id,
      },
    })

    return new Response(JSON.stringify(jots))
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
    const body = jotCreateSchema.parse(json)
    
    let template: JotTemplate|null = null
    if (body.templateId) {
      template = await db.jotTemplate.findFirst({
        where: {
          id: body.templateId,
          authorId: session.user.id,
        },
      });
    }

    const post = await db.jot.create({
      data: {
        title: body.title,
        content: template?.content ?? undefined,
        authorId: session.user.id,
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
