import { HeartIcon } from '@heroicons/react/outline'
import axios from 'axios'
import AddJot from 'components/jots/AddJot'
import { useEffect, useState } from 'react'
import { Jot, Jots } from 'types/models'

const Notes = () => {
  const [jots, setJots] = useState<Jots>([])
  const [isCreatingJot, setIsCreatingJot] = useState(false)

  useEffect(() => {
    const grabJots = async () => {
      const jots: Jots = (await axios.get('/api/jot')).data
      setJots(jots)
    }

    grabJots()
  }, [])

  /**
   * @desc Calls API to update favorite boolean status
   */
  const updateJot = async (jot: Jot) => {
    jot.isFavorite = !jot.isFavorite
    try {
      const updatedJot: Jot = (
        await axios.put('/api/jot', {
          jot,
        })
      ).data

      const index = jots.findIndex((j) => (j.id = jot.id))
      jots[index].isFavorite = updatedJot.isFavorite
      setJots([...jots])
    } catch (e: any) {
      alert(e?.response?.data?.errors?.[0] ?? 'An error occurred. Please try again')
    }
  }

  return (
    <>
      {isCreatingJot && <AddJot onClose={() => setIsCreatingJot(false)} />}

      <section className="body-font overflow-hidden">
        <div className="px-5 pb-5">
          <div className="flex justify-between item-center pb-10">
            <h1 className="text-2xl tracking-wide font-light">All notes</h1>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-jot-blue-100 hover:bg-jot-blue-200"
              onClick={() => setIsCreatingJot(true)}
            >
              New Jot
            </button>
          </div>
          <div className="-my-8 divide-y-2 divide-gray-100 divide-opacity-10">
            {jots.map((jot) => {
              return (
                <div key={jot.id} className="py-4 flex flex-wrap md:flex-nowrap">
                  <div className="md:flex-grow">
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-medium tracking-wide">{jot.title}</h2>
                      <span onClick={() => updateJot(jot)}>
                        <HeartIcon
                          className={`
                            h-5
                            w-5
                            ml-3
                            text-gray-400
                            hover:cursor-pointer
                            hover:text-red-500
                            hover:fill-red-500
                            ${jot.isFavorite ? 'text-red-500 fill-red-500' : null}
                          `}
                        />
                      </span>
                    </div>
                    {/* Have tags > 3 will display + n */}
                    <p className="leading-relaxed text-sm text-gray-400">
                      Last edited on {jot.isFavorite}
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
