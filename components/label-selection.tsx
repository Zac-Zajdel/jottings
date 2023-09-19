"use client"

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { Label } from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

interface labelProps {
  model: string
  modelId: string
}

export function LabelSelection ({ model, modelId}: labelProps) {
  const [labels, setLabels] = useState<Label[]>([])
  const [searchLabel, setSearchLabel] = useState('')
  const debouncedSearchTerm = useDebounce(searchLabel, 400);

  useEffect(() => {
    console.log('This should trigger')
    const fetchLabels = async () => {
      const response = await fetch("/api/labels?" + new URLSearchParams({
        search: searchLabel,
        model: model,
        modelId: modelId,
      }))
      const data = await response.json()
      setLabels(data)
    }

    if (debouncedSearchTerm.length)
      fetchLabels();
  }, [debouncedSearchTerm])

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex items-center">
            <button
              className="bg-transparent border hover:bg-accent hover:text-accent-foreground rounded-full p-1"
            >
              <Icons.add className="w-4 h-4" />
            </button>
            <span className="text-sm pl-2">Add Label</span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Input
            className="h-8 focus-visible:ring-0 rounded-none border-0"
            placeholder="Search for Labels..."
            value={searchLabel}
            onChange={(event) => setSearchLabel(event?.target.value)}
            size={48}
          />

          <DropdownMenuSeparator />

          <span className="text-xs p-2 px-3">
            Select a label or create one
          </span>

          {/* Render applicable labels */}
          {labels.length > 0 && 
            <div className="flex items-center">
              {labels.map((label) => (
                <DropdownMenuLabel>{label.name}</DropdownMenuLabel>
              ))}
            </div>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}