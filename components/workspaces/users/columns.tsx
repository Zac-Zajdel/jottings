"use client"

import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
// import { JotOperations } from "../jot-operations"
import { DataTableColumnHeader } from "../../table/data-table-column-header"

export const columns: ColumnDef<any>[] = [
  {
    meta: 'Title',
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link
              href={`/jots/${row.original.id}`}
              className="font-semibold hover:underline"
            >
              {row.getValue("title")}
            </Link>
          </div>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    meta: 'Author',
    accessorKey: "author",
    accessorFn: row => row.author?.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Author"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            { row.getValue('author')}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    meta: 'Last Updated',
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Updated"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            {formatDate(row.getValue('updatedAt'), 'MMM D, YYYY')}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    meta: 'Actions',
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end p-4 pr-8">
          Hello
          {/* <JotOperations
            jot={{
              id: row.original.id,
              title: row.original.title,
            }}
          /> */}
        </div>
      )
    },
  },
]