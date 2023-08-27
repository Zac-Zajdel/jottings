import * as React from "react"
import { cn } from "@/lib/utils"

interface PageNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageNav({
  children,
  className,
  ...props
}: PageNavProps) {
  return (
    <div className={cn("sticky top-0 z-auto bg-background", className)} {...props}>
      <div className="flex h-14 items-center justify-between py-4 px-3">
        {children}
      </div>
    </div>
  )
}
