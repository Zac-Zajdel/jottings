import { ReactNode } from 'react'
import { XIcon } from '@heroicons/react/outline'

export type BaseModalProps = {
  children?: ReactNode;
  onClose: Function;
  action?: Function | null;
};

const BaseModal = (props: BaseModalProps) => {
  return (
    <div
      className="relative z-10 text-white"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-jot-light-gray first-line:rounded-lg text-left overflow-hidden rounded-xl shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="px-4 py-5">{props.children}</div>
          </div>
        </div>
      </div>

      <div className="transition-opacity">
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="fixed top-0 right-0 p-3 cursor-pointer">
          <div
            className="p-3 bg-gray-600 cursor-pointer rounded-full transition ease-in-out duration-150 hover:bg-gray-800 z-10"
            onClick={() => (props.onClose ? props.onClose() : null)}
          >
            <XIcon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseModal
