import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  data: TData[]
}

export function DataTablePagination<TData>({
  table,
  data,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex-1 text-sm text-muted-foreground">
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={table.getState().pagination.pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage() }
            disabled={!data.length || table.getState().pagination.pageSize > data.length}
          >
            <span className="sr-only">Go to next page</span>
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}