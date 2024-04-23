"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../plate-ui/command"
import { useState } from "react"
import { Icons } from "../icons"
import { toast } from "../ui/use-toast"
import { Workspace } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { createWorkspace, updateActiveUserWorkspace } from "@/lib/workspace/service"

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
  const getWorkspaceAbbrev = activeWorkspace?.name?.split(' ')?.map(word => word?.[0])?.join('')?.slice(0, 2) ?? 'WS'

  /**
   * @desc Create a new workspace and switch into that filter.
   */
  async function submitNewWorkspace() {
    try {
      const newWorkspace = await createWorkspace(workspaceInput, user.id)
      await updateUserAndSidebar(newWorkspace.data.id as string)
      toast({ description: newWorkspace.message })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: 'An error occurred. Please try that again',
        variant: "destructive",
      })
    }
  }

  /**
   * @desc Select a different workspace and switch into that
   */
  async function signIntoWorkspace(workspace: Workspace) {
    if (workspace.id === user.activeWorkspaceId) return

    try {
      const updatedUser = await updateActiveUserWorkspace(workspace, user.id)
      await updateUserAndSidebar(updatedUser.data.activeWorkspaceId as string)
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: 'An error occurred. Please try that again',
        variant: "destructive",
      })
    }
  }

  /**
   * @desc Update users JWT and cleanup server
   */
  async function updateUserAndSidebar(activeWorkspaceId: string) {
    await update({ activeWorkspaceId })
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
              <Avatar className="h-8 w-8 mr-2 rounded-sm">
                <AvatarFallback className="bg-accent font-medium">
                  {getWorkspaceAbbrev}
                </AvatarFallback>
              </Avatar>
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

        <PopoverContent className="p-0 w-52" align="end">
          <Command>
            <CommandInput
              className="-m-1 pl-1"
              placeholder="Select workspaces..."
              onValueChange={(value) => setWorkspaceInput(value)}
            />
            <CommandList className="no-scrollbar">
              <CommandEmpty className="p-1">
                <span
                  className="flex justify-start items-center p-2 text-sm rounded cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => submitNewWorkspace()}
                >
                  <Icons.add className="h-4 w-4 ml-2"/>
                  <p className="pl-2">Create workspace </p>
                </span>
              </CommandEmpty>
              <CommandGroup>
                {workspaces?.map((space, index) => (
                  <div
                    key={index}
                    onClick={() => signIntoWorkspace(space)}
                  >
                    <CommandItem
                      className="flex items-center justify-between p-2 cursor-pointer"
                      value={`workspace-${space.id}`}
                    >
                      <p className="w-22 truncate">{space.name} </p>
                      {
                        space.id === activeWorkspace?.id
                          ? <Icons.check className="h-4 w-4 ml-2"/>
                          : null
                      }
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
