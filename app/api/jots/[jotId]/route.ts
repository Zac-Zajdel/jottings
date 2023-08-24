import { getServerSession } from "next-auth"
import * as z from "zod"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { jotPatchSchema } from "@/lib/validations/jot"

async function validateJotId(jotId: string) {
  const session = await getServerSession(authOptions)
  return !!await db.jot.findFirst({
    where: {
      id: jotId,
      authorId: session?.user.id,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    jotId: z.string().refine(validateJotId, val => ({
      message: `${val} does not belong to the current user.`,
    })),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = await routeContextSchema.parseAsync(context)

    // Get the request body and validate it.
    const json = await req.json()
    const body = jotPatchSchema.parse(json)

    // Update the Jot.
    await db.jot.update({
      where: {
        id: params.jotId,
      },
      data: {
        title: body.title,
        content: body.content,
        status: body.status,
        priority: body.priority,
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

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = await routeContextSchema.parseAsync(context)

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
