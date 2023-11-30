"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface CarouselCardProps {
  heading: string
  description: string
  icon: LucideIcon
  isActive: boolean
  setActiveTab: () => void
}

export default function VerticalCarouselCard(props: CarouselCardProps) {
  const Icon = props.icon

  return (
    <div
      className={cn(
        "p-2 rounded-lg",
        { 'bg-secondary': props.isActive }
      )}
    >
      <div
        className="relative pl-9 pr-3 rounded-lg py-4"
        onMouseOver={() => props.setActiveTab()}
      >
        <dt
          className={cn(
            "inline font-semibold",
            { 'bg-secondary dark:text-muted': props.isActive }
          )}
        >
          <Icon className="h-6 w-6 icon-xl absolute left-0 top-4 text-accent-400" />
          {props.heading}
        </dt>
        <dd
          className={cn(
            "inline text-muted-foreground",
            { 'text-muted-foreground dark:text-muted': props.isActive }
          )}
        >
          {props.description}
        </dd>
      </div>
    </div>
  )
}
