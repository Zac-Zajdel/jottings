import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './global/Sidebar'

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="flex flex-row min-h-screen overflow-hidden bg-jot-light-gray text-white">
    <Sidebar />
    <main className="main flex flex-col flex-grow -ml-48 md:ml-0 transition-all duration-150 ease-in">
      <Header />
      <div className="main-content flex flex-col flex-grow p-4">
        <div className="flex flex-col flex-grow border-4 border-gray-400 border-dashed bg-white rounded mt-4">
          {children}
        </div>
      </div>
    </main>
  </div>
)

export default Layout
