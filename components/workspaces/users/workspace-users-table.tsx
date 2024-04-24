"use client"

import { DataTableToolbar } from "../../table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { useRouter } from "next/navigation"
import { columns } from "../../jots/table/columns"
import { DataTable } from "../../table/data-table"
import { useEffect } from "react"

interface DataTableProps<TData, TValue> {
  data: TData[]
}

export function WorkspaceUsersTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()

  const {
    table,
    sorting,
    pageSize,
    pageIndex,
    globalFilter,
  } = useDataTable(data, columns)

  useEffect(() => {
    let url = new URL(window.location.origin);

    // Sorting based on options
    if (sorting.length) {
      url.searchParams.append(
        'column',
        sorting[0].id,
      );
      url.searchParams.append(
        'order',
        sorting[0].desc ? 'desc' : 'asc',
      );
    }

    // Column Filters
    if (globalFilter.length)
      url.searchParams.append(
        'search',
        globalFilter as string,
      );

    // Pagination Grab Options
    url.searchParams.append(
      'take',
      pageSize.toString(),
    );

    // Pagination Grab Options
    url.searchParams.append(
      'skip',
      (pageIndex * pageSize).toString(),
    );

    router.push(`${url.origin}/settings/workspace/${url.search}`)
  }, [sorting, globalFilter, pageSize, pageIndex])

  return (
    <div>
      <DataTableToolbar
        table={table}
      />
      <DataTable
        data={data}
        table={table}
        columns={columns}
      />
    </div>
  )
}