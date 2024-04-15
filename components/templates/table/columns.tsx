"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../table/data-table-column-header"
import { TemplateOperations } from "../template-operations"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export const columns: ColumnDef<any>[] = [
  {
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
              href={`/templates/${row.original.id}`}
              className="font-semibold hover:underline"
            >
              {row.getValue("title")}
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">
                {formatDate(row.original.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end p-4 pr-8">
          <TemplateOperations
            template={{
              id: row.original.id,
              title: row.original.title,
            }}
          />
        </div>
      )
    },
  },
]