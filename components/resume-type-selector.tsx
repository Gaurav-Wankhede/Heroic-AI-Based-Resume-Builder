'use client'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { ResumeType } from "@/types/resume"

const resumeTypes = [
  {
    value: "fresher",
    label: "Fresher",
    description: "0-1 years of experience, recent graduates",
  },
  {
    value: "transition",
    label: "Career Transition",
    description: "Switching careers or industry",
  },
  {
    value: "experienced",
    label: "Experienced Professional",
    description: "3+ years in the same field",
  },
] as const

interface ResumeTypeSelectorProps {
  onSelect: (value: ResumeType) => void
  className?: string
  defaultValue?: ResumeType
}

export function ResumeTypeSelector({ 
  onSelect, 
  className,
  defaultValue 
}: ResumeTypeSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<ResumeType | "">(
    defaultValue && resumeTypes.some(t => t.value === defaultValue) 
      ? defaultValue 
      : ""
  )

  // Add validation
  const handleSelect = (currentValue: string) => {
    if (resumeTypes.some(t => t.value === currentValue)) {
      setValue(currentValue as ResumeType)
      onSelect(currentValue as ResumeType)
      setOpen(false)
    }
  }

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label className="text-sm font-medium">Resume Type</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {value
              ? resumeTypes.find((type) => type.value === value)?.label
              : "Select resume type..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search resume type..." />
            <CommandList>
              <CommandEmpty>No resume type found.</CommandEmpty>
              <CommandGroup>
                {resumeTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === type.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}