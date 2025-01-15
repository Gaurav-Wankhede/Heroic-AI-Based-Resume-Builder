import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/toast'
import { ResumeProvider } from '@/contexts/resume-context'
import { JobDescriptionProvider } from '@/contexts/job-description-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Heroic Resume Builder',
  description: 'Build professional resumes with AI assistance',
};

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
              {children}
            </ResumeProvider>
          </JobDescriptionProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
