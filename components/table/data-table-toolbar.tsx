"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DataTableViewOptions } from "./data-table-view-options"
import { Icons } from "../icons"
import { useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().globalFilter?.length > 0
  const [search, setSearch] = useState('')

  return (
    <div className="flex items-center justify-between pb-3">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            table.setGlobalFilter(event.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearch('')
              table.setGlobalFilter('')
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}