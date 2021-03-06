import { HeartIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import axios from 'axios'
import Header from 'components/Header'
import AddJot from 'components/jots/AddJot'
import { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { Jot, Jots } from 'types/models'

const Notes = () => {
  const [nav, setNav] = useState('Jots')
  const [jots, setJots] = useState<Jots>([])
  const [dropdownIndex, setDropdownIndex] = useState(-1)
  const [isCreatingJot, setIsCreatingJot] = useState(false)

  const breadcrumbs = [
    {
      title: 'Jots',
      route: '/jots',
    },
  ]

  useEffect(() => {
    grabJots()
  }, [])

  /**
   * @desc - Calls api to fetch list of jots
   * @param query - Query object for filtering
   */
  const grabJots = async (query: { isDeleted?: boolean } = {}) => {
    const jots: Jots = (
      await axios.get('/api/jot', {
        params: query,
      })
    ).data
    setJots(jots)
  }

  /**
   * @desc Adds new jot to local state
   * @param jot - New jot added by user
   */
  const addJot = async (jot: Jot) => {
    setJots([jot, ...jots])
  }

  /**
   * @desc Calls API to update favorite boolean status
   * @param jot - Jot that is being updated
   */
  const updateJot = async (jot: Jot) => {
    jot.isFavorite = !jot.isFavorite
    try {
      const updatedJot: Jot = (
        await axios.put(`/api/jot/${jot.id}`, {
          jot,
        })
      ).data

      const index = jots.findIndex((j) => j.id === jot.id)
      jots[index].isFavorite = updatedJot.isFavorite
      setJots([...jots])
    } catch (e: any) {
      alert(e?.response?.data ?? 'An error occurred. Please try again')
    }
  }

  /**
   * @desc Delete jot and update local state
   * @param jot - Jot being deleted by user
   */
  const deleteJot = async (jot: Jot) => {
    try {
      await axios.delete(`/api/jot/${jot.id}`, {
        data: {
          jot,
        },
      })

      const index = jots.findIndex((j) => j.id === jot.id)
      jots.splice(index, 1)

      // Update local state
      setJots([...jots])
      setDropdownIndex(-1)
    } catch (e: any) {
      alert(e?.response?.data ?? 'An error occurred. Please try again')
    }
  }

  return (
    <>
      {isCreatingJot && <AddJot onClose={() => setIsCreatingJot(false)} action={addJot} />}

      <Header breadcrumbs={breadcrumbs} />
      <section className="body-font mx-5">
        <div className="px-5 pb-10">
          <h1 className="text-2xl tracking-wide font-light">All Jots</h1>

          {/* Header Navigation */}
          <div className="my-10">
            <div className="flex justify-between items-center text-sm pb-2 border-b border-gray-100/25">
              <div>
                <span
                  className={`
                    text-white
                    pb-4
                    cursor-pointer
                    ${nav === 'Jots' ? 'border-b-2 border-white' : 'text-gray-400'}
                  `}
                  onClick={() => {
                    grabJots({ isDeleted: false })
                    setNav('Jots')
                  }}
                >
                  Jots
                </span>
                <span
                  className={`
                  text-white
                    pb-4
                    ml-4
                    cursor-pointer
                    ${nav === 'Deleted' ? 'border-b-2 border-white' : 'text-gray-400'}
                  `}
                  onClick={() => {
                    grabJots({ isDeleted: true })
                    setNav('Deleted')
                  }}
                >
                  Deleted
                </span>
              </div>

              <div className="pb-1">
                <button
                  type="submit"
                  className="inline-flex justify-center py-1 px-3 shadow-sm text-sm font-medium rounded-md text-white bg-jot-blue-100 hover:bg-jot-blue-200"
                  onClick={() => setIsCreatingJot(true)}
                >
                  New Jot
                </button>
              </div>
            </div>
          </div>

          <div className="-my-8 divide-y-2 divide-gray-100 divide-opacity-10 mx-2">
            {jots.map((jot) => {
              return (
                <div key={jot.id} className="py-4 flex flex-wrap md:flex-nowrap cursor-pointer">
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-medium tracking-wide">{jot.title}</h2>
                      {!jot.deletedAt && (
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
                      )}
                    </div>
                    {/* Have tags > 3 will display + n */}
                    <p className="font-light text-sm text-gray-400">
                      Last edited on {jot.updatedAt}
                    </p>
                  </div>

                  <div onClick={() => setDropdownIndex(jot.id)}>
                    <DotsHorizontalIcon
                      className={`
                        h-5
                        w-5
                        mr-3
                        mt-3.5
                        rounded-md
                        text-gray-400
                        hover:bg-jot-hover-gray-100
                        hover:cursor-pointer
                      `}
                    />
                  </div>

                  <div className="relative inline-block text-left">
                    {dropdownIndex === jot.id && (
                      <ClickAwayListener onClickAway={() => setDropdownIndex(-1)}>
                        <div className="origin-top-right absolute right-3 mt-9 w-44 rounded-md shadow-lg bg-jot-hover-gray-100 text-gray-100">
                          <div className="py-1 cursor-pointer text-sm font-light">
                            <span className="block px-4 py-2 hover:bg-jot-hover-gray-200">
                              Rename
                            </span>
                            <span
                              className="block px-4 py-2 hover:bg-jot-hover-gray-200"
                              onClick={() => deleteJot(jot)}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
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
