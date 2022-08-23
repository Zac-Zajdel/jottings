import { ReactNode } from 'react'
import Sidebar from './global/Sidebar'

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="bg-jot-light-gray text-white">
    <div className="flex flex-row min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in rounded">
        {children}
      </main>
    </div>
  </div>
)

export default Layout
