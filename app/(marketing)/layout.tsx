"use client"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { motion } from "framer-motion"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b-[1px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav isLogin items={marketingConfig.mainNav} />
              <nav>
                <a
                  href="/signin"
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "px-4"
                  )}
                >
                  Login
                </a>
              </nav>
            </div>
          </header>
        </motion.div>
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter className="py-5 ml-10 mr-0 3xl:mr-10" />
    </div>
  )
}
