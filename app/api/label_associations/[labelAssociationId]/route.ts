import * as z from "zod"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function validateAssociationId(labelAssociationId: string) {
  return !!await db.labelAssociation.findFirst({
    where: {
      id: labelAssociationId,
    },
  })
}

const routeContextSchema = z.object({
  params: z.object({
    labelAssociationId: z.string().optional().refine(validateAssociationId, val => ({
      message: `${val} does not belong to the current user.`,
    })),
  }),
})

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

    await db.labelAssociation.delete({
      where: {
        id: params.labelAssociationId,
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
