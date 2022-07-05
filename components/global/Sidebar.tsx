import { useEffect, useState } from 'react'
import { FolderIcon, PlusIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { Folders } from 'types/models'
import { Folder } from '@prisma/client'
import Apps from 'types/global/sidebar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AddFolder from 'components/folders/AddFolder'

const Sidebar = () => {
  const router = useRouter()

  const [folders, setFolders] = useState<Folders>([])
  const [isCreatingFolder, setCreatingFolder] = useState(false)

  useEffect(() => {
    const grabFolders = async () => {
      const folders: Folders = (await axios.get('/api/folder')).data
      setFolders(folders)
    }

    grabFolders()
  }, [])

  /**
   * @desc Queries for result set of folders for user
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
            <a href="#" className="inline-flex flex-row items-center">
              <span className="leading-10 text-gray-100 text-2xl px-1 font-bold ml-1 uppercase">
                Jottings
              </span>
            </a>
          </div>
        </div>

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
                          cursor-pointer ${
                            router.pathname === app.to ? 'bg-jot-hover-gray-200' : null
                          }
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

        {/* Footer */}
        <div className="h-[50px] absolute w-full bottom-0 px-8 border-t border-gray-700">
          <ul className="w-full flex items-center justify-between">
            <li className="cursor-pointer text-white pt-5 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-bell"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-messages"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-settings"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx={12} cy={12} r={3} />
              </svg>
            </li>
            <li className="cursor-pointer text-white pt-5 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-archive"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x={3} y={4} width={18} height={4} rx={2} />
                <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                <line x1={10} y1={12} x2={14} y2={12} />
              </svg>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
