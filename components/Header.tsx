import Link from 'next/link'
import { BellIcon, CogIcon } from '@heroicons/react/outline'

interface BreadCrumbs {
  title: string
  route: string
}

interface HeaderProps {
  breadcrumbs?: BreadCrumbs[]
}

const Header = (props: HeaderProps) => {
  return (
    <header className="header border-b border-gray-600/50 bg-jot-light-gray shadow py-2 px-4 mb-6">
      <div className="header-content flex items-center flex-row">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center">
            {props.breadcrumbs?.map((crumb, index) => {
              return (
                <li key={crumb.route}>
                  <div className="flex items-center text-md font-medium text-gray-300">
                    <Link href={crumb.route}>{crumb.title}</Link>
                    {props.breadcrumbs?.[index + 1]?.route && (
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Action icons */}
        <div className="flex justify-end items-center ml-auto text-sm pr-1">
          <BellIcon className="h-5 w-5 font-light cursor-pointer" />
          <CogIcon className="ml-4 h-5 w-5 font-light cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header
