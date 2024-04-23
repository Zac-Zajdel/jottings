import type { Icon } from "lucide-react"
import { Icons } from "@/components/icons"
import { User as AuthUser } from "@auth/core/types"

export interface User extends AuthUser {
  id: UserId
  activeWorkspaceId: string
}

export type SearchParams = {
  [key: string]: string | string[] | undefined
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}
export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: string[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage?: string
  links: {
    twitter: string
    github: string
  }
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
