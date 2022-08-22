import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

interface BreadCrumbs {
  title: string;
  route: string;
}

interface HeaderProps {
  breadcrumbs?: BreadCrumbs[];
}

const Header = (props: HeaderProps) => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

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

        <div className="flex justify-center items-center ml-auto text-sm text-gray-300 font-medium">
          <span className="mr-3">{session?.user?.name}</span>
          <span
            onClick={() => setShowDropdown(true)}
            className="flex flex-row items-center cursor-pointer"
          >
            <Image
              src={session?.user?.image || ''}
              width={30}
              height={30}
              alt="profile photo"
              className="rounded-full"
            />
          </span>

          <div className="relative inline-block text-left">
            {showDropdown && (
              <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                <div className="origin-top-right absolute right-0 mt-6 w-56 rounded-md shadow-lg bg-jot-hover-gray-100 text-gray-100">
                  <div className="py-1 cursor-pointer text-sm font-light">
                    <span className="block px-4 py-2 hover:bg-jot-hover-gray-200">Profile</span>
                    <span
                      onClick={() => signOut({ callbackUrl: window.location.origin })}
                      className="block px-4 py-2 hover:bg-jot-hover-gray-200"
                    >
                      Sign out
                    </span>
                  </div>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
