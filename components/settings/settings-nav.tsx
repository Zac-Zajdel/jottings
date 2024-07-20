"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

export function SettingsNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between mx-8 mb-6 border-b-2">
      <ul>
        <Link
          href="/settings/general"
          className={cn(
            pathname === '/settings/general' ? 'border-b-2 border-b-white' : 'text-muted-foreground',
            "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm"
          )}
        >
          Account
        </Link>
        <Link
          href="/settings/workspace"
          className={cn(
            pathname === '/settings/workspace' ? 'border-b-2 border-b-white' : 'text-muted-foreground',
            "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm"
          )}
        >
          Workspace
        </Link>
      </ul>
    </div>
  )
}
