"use client"

import { DataTableToolbar } from "./data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect } from "react"

interface DataTableProps<TData, TValue> {
  data: TData[]
}

export function JotTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const { table, sorting, columnFilters } = useDataTable(data, columns)

  useEffect(() => {
    let url = new URL(window.location.origin);

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

    if (columnFilters.length)
      url.searchParams.append(
        'search',
        columnFilters[0].value as string,
      );

    router.push(`${url.origin}/jots${url.search}`)
  }, [sorting, columnFilters])

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