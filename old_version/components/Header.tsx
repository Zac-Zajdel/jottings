import { BellIcon, CogIcon } from '@heroicons/react/outline'

const Header = () => {
  return (
    <header className="header border-b border-gray-600/50 bg-jot-light-gray shadow py-2 px-4 mb-6">
      <div className="header-content flex items-center flex-row">
        <div className="flex justify-end items-center ml-auto text-sm pr-1">
          <BellIcon className="h-5 w-5 font-light cursor-pointer" />
          <CogIcon className="ml-4 h-5 w-5 font-light cursor-pointer" />
        </div>
      </div>
    </header>
  )
}

export default Header
