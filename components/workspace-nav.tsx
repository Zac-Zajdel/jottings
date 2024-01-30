"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "./icons"
import { Workspace } from "@prisma/client"
import { signOut } from "next-auth/react"
import { UserAvatar } from "@/components/user-avatar"

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: string
    activeWorkspaceId: string
  }
  workspaces: Workspace[] | null
}

export function WorkspaceNav({ user, workspaces }: WorkspaceNavProps) {
  const activeWorkspace = workspaces?.find(workspace => workspace.id === user.activeWorkspaceId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full focus-visible:outline-none">
        <div className="flex justify-between items-center p-2.5">
          <div className="flex items-center text-xs">
            <UserAvatar
              user={{ name: 'Hello World', image: 'https://picsum.photos/seed/picsum/200/300' || null }}
              className="h-8 w-8 mr-2 rounded-sm"
            />
            <div className="text-xs text-left">
              <div className="font-medium truncate text-ellipsis w-[7.5rem]">
                {activeWorkspace && activeWorkspace.name}
              </div>
            </div>
          </div>
          <div className="pl-3 text-muted-foreground">
            <Icons.chevronsUpDown className="items-end h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="-ml-1 w-[12.8rem]" align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/signin`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
