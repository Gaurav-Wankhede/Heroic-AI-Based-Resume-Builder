'use client'

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { TemplateType, templateOptions } from "./templates"
import { templates } from "@/lib/templates"
import { Resume } from "@/types/resume"

interface TemplateSelectorProps {
  resume: Resume
  onSelect: (newTemplate: TemplateType) => void
  defaultValue: TemplateType
  className?: string
  suggestedTemplates?: readonly string[]
}

export function TemplateSelector({ 
  resume, 
  onSelect, 
  defaultValue, 
  className,
  suggestedTemplates 
}: TemplateSelectorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templateOptions.map((template) => {
          const TemplateComponent = templates[template.value]
          
          return (
            <div
              key={template.value}
              className={cn(
                "group relative rounded-xl overflow-hidden border-2 transition-all duration-200",
                "hover:shadow-lg hover:border-blue-500 cursor-pointer",
                defaultValue === template.value 
                  ? "border-blue-500 shadow-lg" 
                  : "border-gray-200"
              )}
              onClick={() => onSelect(template.value)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(template.value)
                }
              }}
            >
              {/* Live Template Preview */}
              <div className="aspect-[210/297] relative bg-white overflow-hidden">
                <div className="absolute inset-0 transform scale-[0.4] origin-top-left p-4">
                  <TemplateComponent resume={resume} />
                </div>
                {defaultValue === template.value && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-sm">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4 bg-white border-t border-gray-100">
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {template.label}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className={cn(
                "absolute inset-0 bg-blue-500/5 opacity-0 transition-opacity",
                "group-hover:opacity-100",
                defaultValue === template.value && "opacity-100"
              )} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
