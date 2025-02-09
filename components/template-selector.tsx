'use client'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TemplateType, templateOptions } from "./templates"

interface TemplateSelectorProps {
  onSelect: (value: TemplateType) => void
  defaultValue?: TemplateType
  className?: string
}

export function TemplateSelector({ 
  onSelect, 
  defaultValue = 'professional',
  className 
}: TemplateSelectorProps) {
  return (
    <div className={cn("relative", className)}>
      <Select
        defaultValue={defaultValue}
        onValueChange={(value: TemplateType) => onSelect(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templateOptions.map((template) => (
            <SelectItem 
              key={template.value} 
              value={template.value}
            >
              <div className="flex flex-col">
                <span className="font-medium">{template.label}</span>
                <span className="text-xs text-muted-foreground">
                  {template.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
