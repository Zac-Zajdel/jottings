import Tiptap from '@/components/editor/Tiptap'

export default function Home() {
  return (
    <main className="flex flex-grow place-content-center">
      <div className="mx-auto max-w-6xl pb-10 lg:py-12 lg:px-8 w-[800px]">
        <div className="space-y-6 sm:px-6 lg:col-span-12 lg:px-0">
          <div className="min-w-0 flex-1">
            <div className="my-4">
              <input
                type="text"
                className="border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 bg-gray-700 focus:outline-0"
                placeholder="Title"
              />
            </div>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <Tiptap />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
