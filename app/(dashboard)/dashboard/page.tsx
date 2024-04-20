import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Dashboard",
  description: "Create and manage Dashboard.",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/signin")

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      In Progress....
    </div>
  )
}
