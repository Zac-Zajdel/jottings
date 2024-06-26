import * as z from "zod"
import { db } from "@/lib/db"
import { auth } from "@/auth"

async function validateTemplateId(jotTemplateId: string) {
  const session = await auth()
  return !!await db.jotTemplate.findFirst({
    where: {
      id: jotTemplateId,
      workspaceId: session?.user.activeWorkspaceId,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    jotTemplateId: z.string().refine(validateTemplateId, val => ({
      message: `${val} does not belong to the current workspace.`,
    })),
  }),
})

const templatePatchSchema = z.object({
  title: z.string().min(2).max(191),
  content: z.any().optional(),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await auth()
    const { params } = await routeContextSchema.parseAsync(context)

    // Get the request body and validate it.
    const json = await req.json()
    const body = templatePatchSchema.parse(json)

    // Update the template
    await db.jotTemplate.update({
      where: {
        id: params.jotTemplateId,
        workspaceId: session?.user.activeWorkspaceId,
      },
      data: {
        title: body.title,
        content: body.content,
        updatedAt: new Date(),
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
    const session = await auth()
    const { params } = await routeContextSchema.parseAsync(context)

    await db.jotTemplate.delete({
      where: {
        id: params.jotTemplateId,
        workspaceId: session?.user.activeWorkspaceId,
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
