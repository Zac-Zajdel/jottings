import { useState } from 'react'
import BaseModal from './global/BaseModal'
import React from 'react'
import axios from 'axios'

type Props = {
  onClose: Function;
  action: Function;
};

const AddFolder = (props: Props) => {
  const [folder, setFolder] = useState('')

  /**
   * @desc Calls API to create new folder and then emits to parent to add to array
   */
  const createFolder = async () => {
    try {
      const newFolder = await axios.post('/api/folder', {
        name: folder,
      })
      props.action(newFolder.data)
      props.onClose()
    } catch (e: any) {
      alert(e?.response?.data?.errors?.[0] ?? 'An error occurred. Please try again')
    }
  }

  return (
    <BaseModal onClose={() => props.onClose()}>
      <div>
        <label htmlFor="folder" className="text-sm font-medium text-gray-900 block mb-2">
          Folder
        </label>
        <input
          type="text"
          id="folder"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
          placeholder="Name"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          required
        />

        <div className="pt-3 text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-jot-blue-100 hover:bg-jot-blue-200"
            onClick={() => createFolder()}
          >
            Create
          </button>
        </div>
      </div>
    </BaseModal>
  )
}

export default AddFolder
