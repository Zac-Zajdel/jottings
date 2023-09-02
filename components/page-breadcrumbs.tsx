import { Icons } from "./icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./ui/breadcrumbs"

interface Crumb {
  link: string
  title: string
  icon?: string
  isDynamic?: boolean
  isCurrentPage?: boolean
}

interface PageBreadcrumbsProps {
  crumbs: Crumb[]
  children?: React.ReactNode
}

export function PageBreadcrumbs({ crumbs, children }: PageBreadcrumbsProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-4 flex h-14 items-center justify-between">
        {crumbs.length ? (
          <Breadcrumb>
            {crumbs.map((crumb, index) => {
              const Icon = Icons[crumb.icon || "arrowRight"]

              return (
                <BreadcrumbItem
                  key={index}
                  className={crumb?.isDynamic ? 'truncate' : ''}
                  isCurrentPage={crumb.isCurrentPage}
                >
                  <BreadcrumbLink
                    className={crumb.icon ? '' : 'mt-[1px]'}
                    href={crumb.link}
                  >
                    {crumb.icon ? (
                      <Icon className="mr-1 h-4 w-4" />
                    ) : (
                      <div>
                        {crumb.title === '...' ? (
                          <div className="flex justify-center items-center space-x-2">
                            <div className="delay-100 w-1 h-1 mt-0.5 rounded-full animate-bounce bg-gray-200"/>
                            <div className="delay-200 w-1 h-1 mt-0.5 rounded-full animate-bounce bg-gray-200"/>
                            <div className="delay-300 w-1 h-1 mt-0.5 rounded-full animate-bounce bg-gray-200"/>
                          </div>
                        ) : (
                          <span>{crumb.title}</span>
                        )}
                      </div>
                    )}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
            })}
          </Breadcrumb>
        ) : null}
        <div>{children}</div>
      </div>
    </header>
  )
}
