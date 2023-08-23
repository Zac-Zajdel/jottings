import { getServerSession } from "next-auth"
import * as z from "zod"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { jotPatchSchema } from "@/lib/validations/jot"

async function validateTemplateId(jotTemplateId: string) {
  const session = await getServerSession(authOptions)
  return !!await db.jotTemplate.findFirst({
    where: {
      id: jotTemplateId,
      authorId: session?.user.id,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    jotTemplateId: z.string().refine(validateTemplateId, val => ({
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

    // Update the template
    await db.jotTemplate.update({
      where: {
        id: params.jotTemplateId,
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

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = await routeContextSchema.parseAsync(context)

    await db.jotTemplate.delete({
      where: {
        id: params.jotTemplateId,
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
