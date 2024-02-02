"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../plate-ui/command"
import { Icons } from "../icons"
import { Workspace } from "@prisma/client"
import { UserAvatar } from "@/components/user-avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { createWorkspace, updateActiveWorkspace } from "@/lib/workspace/service"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface WorkspaceItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: string
    activeWorkspaceId: string
  }
  workspaces: Workspace[] | null
}

export function WorkspaceItems({ user, workspaces }: WorkspaceItemsProps) {
  const router = useRouter()
  const { update } = useSession()
  const [openPopover, setOpenPopover] = useState(false)
  const [workspaceInput, setWorkspaceInput] = useState('')

  // Based off users JWT token
  const activeWorkspace = workspaces?.find(workspace => workspace.id === user.activeWorkspaceId)

  /**
   * @desc Create a new workspace and switch into that filter.
   */
  async function submitNewWorkspace() {
    const newWorkspace = await createWorkspace(workspaceInput, user.id)
    await update({ activeWorkspaceId: newWorkspace.id})
    router.refresh()
    setOpenPopover(!openPopover)
  }

  /**
   * @desc Select a different workspace and switch into that
   */
  async function signIntoWorkspace(workspace: Workspace) {
    if (workspace.id === user.activeWorkspaceId) return

    await updateActiveWorkspace(workspace, user.id)
    await update({ activeWorkspaceId: workspace.id})
    router.refresh()
    setOpenPopover(!openPopover)
  }

  return (
    <div className="flex items-center justify-between space-x-4">
      <Popover
        open={openPopover}
        onOpenChange={() => setOpenPopover(!openPopover)}
      >
        <PopoverTrigger asChild className="cursor-pointer">
          <div className="flex justify-between items-center p-2.5">
            <div className="flex items-center text-xs">
              <UserAvatar
                user={{ 
                  name: `${activeWorkspace?.name ?? ''}`,
                  image: 'https://picsum.photos/seed/picsum/200/300' || null
                }}
                className="h-8 w-8 mr-2 rounded-sm"
              />
              <div className="text-xs text-left">
                <div className="font-medium truncate text-ellipsis w-[7.5rem]">
                  {activeWorkspace?.name}
                </div>
              </div>
            </div>
            <div className="pl-3 text-muted-foreground">
              <Icons.chevronsUpDown className="items-end h-4 w-4" />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0 ml-2 w-52" align="end">
          <Command>
            <CommandInput
              placeholder="Select workspaces..."
              onValueChange={(value) => setWorkspaceInput(value)}
            />
            <CommandList className="no-scrollbar">
              <CommandEmpty className="p-1">
                <span
                  className="flex justify-start items-center p-2 text-sm rounded cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => submitNewWorkspace()}
                >
                  <p className="pl-2">Create Workspaces </p>
                  <Icons.add className="items-end h-4 w-4 ml-2"/>
                </span>
              </CommandEmpty>
              <CommandGroup>
                {workspaces?.map((space, index) => (
                  <div
                    key={index}
                    onClick={() => signIntoWorkspace(space)}
                  >
                    <CommandItem
                      className="flex items-start px-4 py-2 cursor-pointer"
                      value={`workspace-${space.id}`}
                    >
                      <p className="w-22 truncate">{space.name} </p>
                    </CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
