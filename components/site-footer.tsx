import * as React from "react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex justify-end gap-4 py-10">
        <ModeToggle />
      </div>
    </footer>
  )
}
