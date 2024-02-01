"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./plate-ui/command"
import { Icons } from "./icons"
import { Workspace } from "@prisma/client"
import { UserAvatar } from "@/components/user-avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { updateActiveWorkspace } from "@/lib/user/services"
import { createWorkspace } from "@/lib/workspace/service"

interface WorkspaceNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    id: string
    activeWorkspaceId: string
  }
  workspaces: Workspace[] | null
}

export function WorkspaceNav({ user, workspaces }: WorkspaceNavProps) {
  const activeWorkspace = workspaces?.find(workspace => workspace.id === user.activeWorkspaceId)

  async function updateWorkspace(workspace: Workspace) {
    await updateActiveWorkspace(workspace, user.id)
  }

  async function createWorkspaceLocal() {
    console.log('CALLING THIS')
    await createWorkspace(user.id)
  }

  return (
    <div className="flex items-center justify-between space-x-4">
      <Popover>
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

        <PopoverContent className="p-0" align="end">
          <Command>
            <CommandInput placeholder="Select workspaces..." />
            <CommandList>
              <CommandEmpty className="p-1">
                <span
                  className="flex justify-start items-center p-2 text-sm rounded cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => createWorkspaceLocal()}
                >
                  <p className="pl-2">Create Workspaces </p>
                  <Icons.add className="items-end h-4 w-4 ml-2"/>
                </span>
              </CommandEmpty>
              <CommandGroup>
                {workspaces?.map((space, index) => (
                  <div
                    key={index}
                    onClick={() => updateWorkspace(space)}
                  >
                    <CommandItem className="flex items-start px-4 py-2 cursor-pointer">
                      <p>{space.name} </p>
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
