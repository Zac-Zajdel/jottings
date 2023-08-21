import * as React from "react"
import { cn } from "@/lib/utils"

interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageShell({
  children,
  className,
  ...props
}: PageShellProps) {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}
