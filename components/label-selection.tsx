"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { Label } from "@prisma/client";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

interface labelProps {
  model: 'jot' | 'jotTemplate'
  modelId: string
}

export function LabelSelection ({ model, modelId}: labelProps) {
  const router = useRouter()

  const [newLabelColor, setNewLabelColor] = useState(Math.floor(Math.random() * 16777215).toString(16))
  const [labels, setLabels] = useState<Label[]>([])
  const [searchLabel, setSearchLabel] = useState('')
  const debouncedSearchTerm = useDebounce(searchLabel, 250);

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await fetch("/api/labels?" + new URLSearchParams({
        search: searchLabel,
      }))
      const data = await response.json()
      setLabels(data)
    }

    fetchLabels();
  }, [debouncedSearchTerm])

  async function createLabel() {
    const response = await fetch("/api/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: searchLabel,
        color: newLabelColor,
        model: model,
        modelId: modelId,
      }),
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your label was not created. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
    router.push(`/jots/${modelId}`)

    setNewLabelColor(Math.floor(Math.random() * 16777215).toString(16));
  }

  function getColorByBgColor(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex items-center">
            <button className="bg-transparent border hover:bg-accent hover:text-accent-foreground rounded-full p-1">
              <Icons.add className="w-4 h-4" />
            </button>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <Input
            className="h-8 focus-visible:ring-0 rounded-none border-0 text-primary"
            placeholder="Search or Create Labels..."
            value={searchLabel}
            onChange={(event) => setSearchLabel(event?.target.value)}
            size={80}
          />

          <DropdownMenuSeparator />

          {/* Render applicable labels */}
          {(labels.length === 0 && searchLabel.length !== 0) &&
            <span>
              <DropdownMenuLabel
                className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                onClick={() => createLabel()}
              >
                <span
                  className="text-sm text-primary font-light p-1 rounded-md"
                >
                  <span className="pr-2">Create</span>
                  <span
                    className="p-1 rounded-sm"
                    style={{
                      backgroundColor: `#${newLabelColor}`,
                      color: getColorByBgColor(newLabelColor)
                    }}
                  >
                    { searchLabel }
                  </span>
                </span>
              </DropdownMenuLabel>
            </span>
          }

          {labels.length > 0 && 
            <div>
              {labels.map((label) => (
                <DropdownMenuLabel
                  className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                >
                  <span
                    className="text-sm text-primary font-medium p-1 rounded-md"
                    style={{
                      backgroundColor: `#${label.color}`,
                      color: getColorByBgColor(label.color)
                    }}
                  >
                    {label.name}
                  </span>
                </DropdownMenuLabel>
              ))}
            </div>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}