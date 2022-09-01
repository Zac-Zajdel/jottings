import Tiptap from '@/components/editor/Tiptap'

export default function Home() {
  return (
    <main className="flex flex-grow place-content-center">
      <div className="mx-auto w-full max-w-6xl pb-10 lg:py-12 lg:px-8">
        <div className="space-y-6 sm:px-6 lg:col-span-12 lg:px-0">
          <div className="min-w-0 flex-1">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <Tiptap />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
