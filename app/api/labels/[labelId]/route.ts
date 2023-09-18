import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function validateJotId(jotId: string) {
  const session = await getServerSession(authOptions)
  return !!await db.jot.findFirst({
    where: {
      id: jotId,
      authorId: session?.user.id,
    },
  })
}

async function validateJotTemplateId(templateId: string) {
  const session = await getServerSession(authOptions)
  return !!await db.jotTemplate.findFirst({
    where: {
      id: templateId,
      authorId: session?.user.id,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    labelId: z.string().optional().refine(validateJotId, val => ({
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
    const body = z.object({
      name: z.string().min(2).max(191),
      color: z.string().max(191),
      jotId: z.string().optional().refine(validateJotId, val => ({
        message: `${val} does not belong to the current user.`,
      })),
      jotTemplateId: z.string().optional().refine(validateJotTemplateId, val => ({
        message: `${val} does not belong to the current user.`,
      })),
    })
    .parse(json)

    // Update the Label.
    await db.label.update({
      where: {
        id: params.labelId,
      },
      data: {
        name: body.name,
        color: body.color,
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

    await db.label.delete({
      where: {
        id: params.labelId,
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
