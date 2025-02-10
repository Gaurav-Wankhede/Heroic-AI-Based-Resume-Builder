import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/toast'
import { ResumeProvider } from '@/contexts/resume-context'
import { JobDescriptionProvider } from '@/contexts/job-description-context'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Heroic Resume Builder',
  description: 'AI-powered resume builder to help you land your dream job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <JobDescriptionProvider>
            <ResumeProvider>
              {/* Navbar will only show on non-landing pages */}
              <div className="min-h-screen flex flex-col">
                {children}
              </div>
              <Toaster />
            </ResumeProvider>
          </JobDescriptionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
