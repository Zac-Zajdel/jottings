import { HeartIcon } from '@heroicons/react/outline'
import AddJot from 'components/jots/AddJot'
import { useState } from 'react'

const Notes = () => {
  const [isCreatingJot, setIsCreatingJot] = useState(false)

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
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:flex-grow">
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-medium tracking-wide">AWS Certification</h2>
                  <HeartIcon className="h-5 w-5 ml-3 text-gray-400 hover:cursor-pointer hover:text-red-500 hover:fill-red-500" />
                </div>
                <p className="leading-relaxed text-sm text-gray-400">
                  Last edited on July 2nd at 2:34AM
                </p>
                <a className="text-indigo-500 inline-flex items-center mt-4">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Notes
