import { useSession } from 'next-auth/react'
import Image from 'next/image'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="header border-b border-gray-600 bg-jot-light-gray shadow py-4 px-4">
      <div className="header-content flex items-center flex-row">
        <form action="#">
          <div className="flex md:order-2">
            <div className="hidden relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="flex md:hidden">
            <a href="#" className="flex items-center justify-center h-10 w-10 border-transparent">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
          </div>
        </form>

        <div className="flex ml-auto text-sm font-medium">
          <a href="#" className="flex flex-row items-center">
            <Image
              src={session?.user?.image || ''}
              width={50}
              height={50}
              alt="profile photo"
              className="rounded-full"
            />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
