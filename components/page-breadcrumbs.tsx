import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "./ui/breadcrumbs"

interface Crumb {
  link: string
  title: string
  isCurrentPage?: boolean
}

interface PageBreadcrumbsProps {
  crumbs: Crumb[]
  children?: React.ReactNode
}

export function PageBreadcrumbs({
  crumbs,
  children,
}: PageBreadcrumbsProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="flex h-14 items-center justify-between mx-4">
        {crumbs.length ?
          <Breadcrumb>
            {crumbs.map((crumb) => (
              <BreadcrumbItem {...crumb}>
                <BreadcrumbLink href={crumb.link}>{crumb.title}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
          : null
        }
        <div>
          {children}
        </div>
      </div>
    </header>
  )
}
