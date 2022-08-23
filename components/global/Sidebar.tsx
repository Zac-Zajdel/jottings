import { useEffect, useState } from 'react'
import { FolderIcon, PlusIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { Folders } from 'types/models'
import { Folder } from '@prisma/client'
import Apps from 'types/global/sidebar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AddFolder from '@/components/folders/AddFolder'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import ClickAwayListener from 'react-click-away-listener'

const Sidebar = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [folders, setFolders] = useState<Folders>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isCreatingFolder, setCreatingFolder] = useState(false)

  useEffect(() => {
    const grabFolders = async () => {
      const folders: Folders = (await axios.get('/api/folder')).data
      setFolders(folders)
    }

    grabFolders()
  }, [])

  /**
   * @desc Adds new folder to local state
   * @param folder - New folder added by user
   */
  const addFolder = async (folder: Folder) => {
    setFolders([...folders, folder])
  }

  return (
    <>
      {isCreatingFolder && (
        <AddFolder onClose={() => setCreatingFolder(false)} action={addFolder} />
      )}

      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-jot-dark-black">
        <div className="sidebar-header flex items-center p-4">
          <div className="flex flex-col w-full">
            <Link href="/" className="inline-flex flex-row items-center">
              <span className="leading-10 text-gray-100 text-2xl px-1 font-bold ml-1 uppercase">
                Jottings
              </span>
            </Link>
          </div>
        </div>

        {/* Modules */}
        <div className="p-3">
          <ul className="flex flex-col w-full text-sm font-medium">
            <li className="my-px">
              <span className="flex text-white px-4 mb-2">Quick links</span>
            </li>
            {Apps.navigation.map((app) => {
              const DynamicComponent = app.icon
              return (
                <Link key={app.to} href={app.to}>
                  <li
                    className={`my-px
                      ml-1
                      flex
                      flex-row
                      items-center
                      h-10
                      px-3
                      rounded-lg
                      text-gray-300
                      bg-opacity-50
                      hover:bg-opacity-50
                      hover:bg-jot-hover-gray-200
                      hover:text-gray-200
                      cursor-pointer ${router.pathname === app.to ? 'bg-jot-hover-gray-200' : null}
                    `}
                  >
                    <DynamicComponent className="h-5 w-5 text-gray-400" />
                    <span className="ml-3">{app.label}</span>
                  </li>
                </Link>
              )
            })}
          </ul>
        </div>

        {/* Folders */}
        <div className="p-3">
          <ul className="flex flex-col w-full text-sm font-medium">
            <li className="flex justify-between items-center my-px rounded-lg hover:bg-jot-hover-gray-100 py-1 pr-2">
              <span className="flex text-white px-4 my-1">Folders</span>
              <span className="hover:bg-jot-hover-gray-200 hover:cursor-pointer rounded-md p-1">
                <PlusIcon
                  className="h-4 w-4 text-gray-400"
                  onClick={() => setCreatingFolder(true)}
                />
              </span>
            </li>
            {folders.map((folder) => {
              return (
                <li key={folder.id} className="my-px ml-1">
                  <a
                    href="#"
                    className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-jot-hover-gray-200 hover:text-gray-200 bg-opacity-50 hover:bg-opacity-50"
                  >
                    <FolderIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-3">{folder.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* User */}
        <div className="h-[65px] absolute w-full bottom-0 pl-6 pt-4 border-t border-gray-700 text-sm text-gray-300">
          <div className="flex items-center ml-auto font-medium">
            <span
              onClick={() => setShowDropdown(true)}
              className="flex-inline flex-row items-center cursor-pointer"
            >
              <Image
                src={session?.user?.image || ''}
                width={30}
                height={30}
                alt="profile photo"
                className="rounded-full"
              />
            </span>

            <div className="ml-4">
              <span>{session?.user?.name}</span>
              <span className="flex items-center text-xs font-light">Private</span>
            </div>

            <div className="relative inline-block text-left">
              {showDropdown && (
                <div className="absolute bottom-9 -left-[140px] mt-6 w-64 rounded-md shadow-lg bg-jot-hover-gray-100 text-gray-100">
                  <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <div className="py-1 cursor-pointer text-sm font-light">
                      <span className="block px-4 py-2 hover:bg-jot-hover-gray-200">Profile</span>
                      <span
                        onClick={() => signOut({ callbackUrl: window.location.origin })}
                        className="block px-4 py-2 hover:bg-jot-hover-gray-200"
                      >
                        Sign out
                      </span>
                    </div>
                  </ClickAwayListener>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
