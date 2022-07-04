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
            {/* Call BaseModal and adjust the background color */}
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
                <h2 className="text-xl font-medium tracking-wide mb-2">AWS Certification</h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up
                  snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke
                  vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.
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
