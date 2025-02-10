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

interface DonateButtonProps {
  variant?: 'default' | 'secondary' | 'outline'
}

export function DonateButton({ variant = 'default' }: DonateButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          className={`gap-2 rounded-full backdrop-blur-sm ${
            variant === 'outline' 
              ? 'border-white/20 hover:bg-white/10' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          <Coffee className="h-4 w-4" />
          Buy me a coffee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-md border-white/20">
        <DialogHeader>
          <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">
            Support the Project
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            If you find this tool helpful, consider buying me a coffee! Your support helps keep this project free and updated.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative w-48 h-48 p-4 rounded-2xl bg-white shadow-lg">
            <Image
              src="/upi-qr.png"
              alt="UPI QR Code"
              fill
              className="object-contain p-2"
            />
          </div>
          <p className="text-sm text-center text-slate-500">
            Scan with any UPI app to donate
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium text-slate-700">UPI ID:</p>
            <code className="relative rounded-lg bg-slate-100 px-4 py-2 font-mono text-sm text-slate-700">
              your.upi@bank
            </code>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 