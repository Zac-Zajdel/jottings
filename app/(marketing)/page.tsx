"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Jottings
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Organize your projects in a streamlined workflow with all your data in one location.
          </p>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Opt-in capabilities to facilitate the most complex multi-team projects
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.project className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze all information in one place.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.file className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Jots</h3>
                <p className="text-sm text-muted-foreground">
                  Generate notes as you work.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.listCheck className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Manage deadlines and keep focused.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.group className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Groups</h3>
                <p className="text-sm text-muted-foreground">
                  Share information when ready.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.permissions className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Permissions</h3>
                <p className="text-sm text-muted-foreground">
                  Give limited access and capabilities.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.board className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Boards</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize overall work and progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
