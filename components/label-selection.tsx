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
  model: 'jots' | 'templates'
  modelId: string
}

export function LabelSelection ({ model, modelId }: labelProps) {
  const router = useRouter()

  const [newLabelColor, setNewLabelColor] = useState(Math.floor(Math.random() * 16777215).toString(16))
  const [hasOpened, setHasOpened] = useState(false)
  const [labels, setLabels] = useState<Label[]>([])
  const [searchLabel, setSearchLabel] = useState('')
  const debouncedSearchTerm = useDebounce(searchLabel, 250);

  useEffect(() => {
    if (hasOpened)
      fetchLabels();
  }, [debouncedSearchTerm])

  const fetchLabels = async () => {
    const response = await fetch("/api/labels?" + new URLSearchParams({
      search: searchLabel,
      model: model,
      modelId: modelId,
    }))
    const data = await response.json()
    setLabels(data)
  }

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
      const data = await response.json();
      return toast({
        title: data[0]?.message,
        variant: "destructive",
      })
    }

    router.refresh()
    router.push(`/${model}/${modelId}`)

    setSearchLabel('')
    setNewLabelColor(Math.floor(Math.random() * 16777215).toString(16));
  }

  function getColorByBgColor(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
  }

  async function linkLabel(label: Label) {
    const response = await fetch("/api/label_associations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        modelId: modelId,
        labelId: label.id,
      }),
    })

    if (!response?.ok) {
      const data = await response.json()
      return toast({
        title: data[0]?.message,
        variant: "destructive",
      })
    }

    router.refresh()
    router.push(`/${model}/${modelId}`)

    if (searchLabel.length) {
      setSearchLabel('')
    } else {
      fetchLabels()
    }
  }

  return (
    <div>
      <DropdownMenu onOpenChange={(opened) => {
        setHasOpened(true)
        if (opened) fetchLabels()
      }}>
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

          <div>
            {labels.map((label) => (
              <DropdownMenuLabel
                className="cursor-pointer bg-transparent hover:bg-accent hover:text-accent-foreground"
                key={label.id}
                onClick={() => linkLabel(label)}
              >
                <span
                  className="text-sm text-primary font-medium py-1 px-1.5 rounded-md"
                  style={{
                    backgroundColor: `#${label.color}`,
                    color: getColorByBgColor(label.color)
                  }}
                >
                  {label.name}
                </span>
              </DropdownMenuLabel>
            ))}
            {}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}