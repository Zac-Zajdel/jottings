import { ReactNode } from 'react'

type Props = {
  children: ReactNode;
};

const BaseModal = ({ children }: Props) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 py-5">
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseModal
