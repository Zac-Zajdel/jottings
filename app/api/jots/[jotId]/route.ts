import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { jotPatchSchema } from "@/lib/validations/jot"

const routeContextSchema = z.object({
  params: z.object({
    jotId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this jot.
    if (!(await verifyCurrentUserHasAccessToJot(params.jotId))) {
      return new Response(null, { status: 403 })
    }

    await db.jot.delete({
      where: {
        id: params.jotId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this jot.
    if (!(await verifyCurrentUserHasAccessToJot(params.jotId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = jotPatchSchema.parse(json)

    // Update the jot.
    await db.jot.update({
      where: {
        id: params.jotId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToJot(jotId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.jot.count({
    where: {
      id: jotId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}
