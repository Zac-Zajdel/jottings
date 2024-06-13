import { User } from "@/types"
import { getCurrentUser } from "@/lib/session"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "General",
  description: "Manage account and workspace settings.",
}

export default async function SettingsGeneral() {
  const user = await getCurrentUser() as User

  return (
    <>
      <div className="grid gap-10 mx-8 mb-3">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </>
  )
}
