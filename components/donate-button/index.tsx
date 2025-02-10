'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Coffee } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DonateButtonProps {
  variant?: 'default' | 'secondary' | 'outline'
}

export function DonateButton({ variant = 'default' }: DonateButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost"
          className={cn(
            "gap-2 rounded-full transition-all duration-200",
            variant === 'outline'
              ? "bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
              : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0"
          )}
        >
          <Coffee className="h-4 w-4 animate-bounce" />
          <span className="font-medium">Buy me a coffee</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Coffee className="h-5 w-5 text-orange-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
              Support the Project
            </span>
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            If you find this tool helpful, consider buying me a coffee! Your support helps keep this project free and updated.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative w-48 h-48 p-4 rounded-2xl bg-white shadow-lg group hover:shadow-xl transition-all duration-200">
            <Image
              src="/upi-qr.png"
              alt="UPI QR Code"
              fill
              className="object-contain p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-2xl group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-all duration-200" />
          </div>
          <p className="text-sm text-center text-slate-500">
            Scan with any UPI app to donate
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium text-slate-700">UPI ID:</p>
            <div className="group relative">
              <code className="relative rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2 font-mono text-sm text-slate-700">
                pgywww-1@okhdfcbank
              </code>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-200 rounded-lg" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 