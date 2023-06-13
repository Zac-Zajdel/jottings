import { useState } from 'react'
import BaseModal, { BaseModalProps } from '../global/BaseModal'
import React from 'react'
import axios from 'axios'
import { Folder } from 'types/models'

const AddFolder = (props: BaseModalProps) => {
  const [folder, setFolder] = useState('')

  /**
   * @desc Calls API to create new folder and then emits to parent to add to array
   */
  const createFolder = async () => {
    try {
      const newFolder: Folder = (
        await axios.post('/api/folder', {
          name: folder,
        })
      ).data

      if (props.action) props.action(newFolder)
      props.onClose()
    } catch (e: any) {
      alert(e?.response?.data ?? 'An error occurred. Please try again')
    }
  }

  return (
    <BaseModal onClose={() => props.onClose()}>
      <div>
        <label htmlFor="folder" className="text-sm font-light block mb-2">
          Folder
        </label>
        <input
          type="text"
          className="block p-2.5 w-full rounded-lg sm:text-sm bg-gray-700 dark:placeholder-gray-400 text-white"
          id="folder"
          placeholder="Name"
          value={folder}
          autoComplete="off"
          onChange={(e) => setFolder(e.target.value)}
          required
        />

        <div className="pt-5 text-right">
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
