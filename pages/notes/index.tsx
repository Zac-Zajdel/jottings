import { HeartIcon } from '@heroicons/react/outline'
import axios from 'axios'
import AddJot from 'components/jots/AddJot'
import { useEffect, useState } from 'react'
import { Jots } from 'types/models'

const Notes = () => {
  const [jots, setJots] = useState<Jots>([])
  const [isCreatingJot, setIsCreatingJot] = useState(false)

  useEffect(() => {
    const grabJots = async () => {
      const jots = await axios.get('/api/jot')
      setJots(jots.data)
    }

    grabJots()
  }, [])

  return (
    <>
      {isCreatingJot && <AddJot onClose={() => setIsCreatingJot(false)} />}

      <section className="body-font overflow-hidden">
        <div className="container px-5 pb-5 mx-auto">
          <div className="flex justify-between item-center pb-10">
            <h1 className="text-2xl tracking-wide font-medium">All notes</h1>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-jot-blue-100 hover:bg-jot-blue-200"
              onClick={() => setIsCreatingJot(true)}
            >
              New Jot
            </button>
          </div>
          <div className="-my-8 divide-y-2 divide-gray-100 divide-opacity-10">
            {/* Below here is where we loop */}
            {jots.map((folder) => {
              return (
                <div key={folder.id} className="py-4 flex flex-wrap md:flex-nowrap">
                  <div className="md:flex-grow">
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-medium tracking-wide">{folder.title}</h2>
                      <HeartIcon className="h-5 w-5 ml-3 text-gray-400 hover:cursor-pointer hover:text-red-500 hover:fill-red-500" />
                    </div>
                    <p className="leading-relaxed text-sm text-gray-400">
                      Last edited on {folder.updatedAt}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Notes
