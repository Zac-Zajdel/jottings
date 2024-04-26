"use client"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { WorkspaceUsersTableOperations } from "@/components/workspaces/users/workspace-users-table-operations"

export const columns: ColumnDef<any>[] = [
  {
    meta: 'User',
    accessorKey: "user",
    accessorFn: row => row.user?.name,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3 p-4">
          <span>
            { row.getValue('user')}
          </span>
          <span>
            { !row.original.hasAcceptedInvite && (
              <Badge>Invited</Badge>
            )}
            { row.original.userId === row.original?.workspace?.ownerId
              ? <Badge>Owner</Badge>
              : null
            }
          </span>
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
              hasAcceptedInvite: row.original.hasAcceptedInvite,
            }}
            workspace={row.original.workspace}
          />
        </div>
      )
    },
  },
]
