"use client"

import { formatDate } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { WorkspaceUsersTableOperations } from "./workspace-users-table-operations"

export const columns: ColumnDef<any>[] = [
  {
    meta: 'Member',
    accessorKey: "user",
    accessorFn: row => row.user?.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Member"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            { row.getValue('user')}
          </div>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    meta: 'Date Joined',
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date Joined"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            {formatDate(row.getValue('createdAt'), 'MMM D, YYYY')}
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
          <WorkspaceUsersTableOperations
            workspaceUser={{
              id: row.original.id,
              userId: row.original.userId,
              workspaceId: row.original.workspaceId,
            }}
          />
        </div>
      )
    },
  },
]
