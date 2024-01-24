import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function validateLabelId(labelId: string) {
  const session = await getServerSession(authOptions)
  return !!await db.label.findFirst({
    where: {
      id: labelId,
      workspaceId: session?.user.activeWorkspaceId,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    labelId: z.string().optional().refine(validateLabelId, val => ({
      message: `${val} does not belong to the current user.`,
    })),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { params } = await routeContextSchema.parseAsync(context)

    // Get the request body and validate it.
    const json = await req.json()
    const body = z.object({
      name: z.string().min(2).max(191),
      color: z.string().max(191),
    })
    .parse(json)

    // Update the Label.
    await db.label.update({
      where: {
        id: params.labelId,
        workspaceId: session.user.activeWorkspaceId,
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
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { params } = await routeContextSchema.parseAsync(context)

    await db.label.delete({
      where: {
        id: params.labelId,
        workspaceId: session.user.activeWorkspaceId,
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
