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
    console.log('sorting', sorting)
    console.log('columnFiltering', columnFilters)
  }, [sorting, columnFilters])

  // TODO - This needs debounced.
  const handleSearch = (e) => {
    console.log(sorting)
    e.preventDefault();
    router.push(`/jots?search=${e.target.value}`)
  }

  return (
    <div>
      <DataTableToolbar
        table={table}
      />
      <Input
        type="text"
        onChange={(e) => handleSearch(e)}
      />
      <DataTable
        data={data}
        columns={columns}
      />
    </div>
  )
}