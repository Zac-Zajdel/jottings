"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"
import packageJson from '../package.json'
import { Tabs, TabsList } from "./ui/tabs"
import { TabsTrigger } from "@radix-ui/react-tabs"
import { useTheme } from "next-themes"
import { Icons } from "./icons"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full focus-visible:outline-none">
        <div className="flex justify-between items-center py-3 px-3">
          <div className="flex items-center">
            <UserAvatar
              user={{ name: user.name || null, image: user.image || null }}
              className="h-8 w-8 rounded-sm"
            />
            <div className="pl-4 text-xs">
              <div className="font-medium">
                { user.name }
              </div>
              <div className="text-muted-foreground mr-6">
                Admin
              </div>
            </div>
          </div>
          <div className="pl-3 text-muted-foreground">
            <Icons.chevronsUpDown className="items-end h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-1 w-[12.8rem]" align="end">
        <div className="flex items-center justify-start gap-2 p-2 mb-2">
          <div className="flex flex-col space-y-1 leading-none w-44">
            <p className="text-sm font-bold leading-none">{user.name}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <Tabs defaultValue={theme}>
          <TabsList className="grid h-8 grid-cols-2 text-xs">
            <TabsTrigger
              className={theme === 'light' ? 'bg-background p-1 rounded-md' : ''}
              value="light"
              onClick={() => setTheme("light")}
            >
              Light
            </TabsTrigger>
            <TabsTrigger
              className={theme === 'dark' ? 'bg-background p-1 rounded-md' : ''}
              value="dark"
              onClick={() => setTheme("dark")}
            >
              Dark
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenuSeparator className="mt-2" />

        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none w-44">
          <p className="text-xs font-medium leading-none">Version v{ packageJson.version }</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/jots">Jots</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/templates">Templates</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
