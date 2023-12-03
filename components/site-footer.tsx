import * as React from "react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Icons } from "./icons"
import Link from "next/link"
import { motion } from "framer-motion"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <div className="flex items-center justify-center lg:justify-between p-6">
          <div className="mr-12 text-sm sm:text-base">
            <span className="text-muted-foreground">Proudly built in open source by </span>
            <Link
              className="block sm:inline"
              href="https://github.com/Zac-Zajdel"
              target="_blank"
            >
              Zac Zajdel
            </Link>
          </div>
          <div className="flex">
            <Link
              href="https://github.com/Zac-Zajdel/jottings"
              target="_blank"
            >
              <Icons.gitHub className="h-6 w-6 mr-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
