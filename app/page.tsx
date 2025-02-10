'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Wand2, LayoutTemplate, CheckCircle, Sparkles, Target, Clock } from 'lucide-react'
import { DonateButton } from '@/components/donate-button/index'
import { GridPattern } from '@/components/ui/grid-pattern'
import { Navbar } from '@/components/navbar'

export default function LandingPage() {
  const router = useRouter()

  return (
    <>
      {/* Navbar with transparent background for landing page */}
      <div className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Heroic Resume
            </h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                className="text-slate-200 hover:text-white hover:bg-white/10"
                onClick={() => router.push('/resume')}
              >
                Resume
              </Button>
              <div className="pl-4 border-l border-white/20">
                <DonateButton variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
          {/* Glassmorphism background effects */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-300 text-sm border border-white/20">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Resume Builder
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400">
                  Create Professional Resumes in Minutes
                </h1>
                <p className="text-xl text-slate-300">
                  Build stunning, ATS-friendly resumes with our AI-powered builder. Stand out from the crowd and land your dream job.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-blue-600/90 hover:bg-blue-600 backdrop-blur-sm text-white px-8 rounded-full"
                    onClick={() => router.push('/resume')}
                  >
                    Create Your Resume
                  </Button>
                  <DonateButton />
                </div>
              </div>
              <div className="relative h-[400px] hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/20" />
                <Image
                  src="/resume-preview.png"
                  alt="Resume Preview"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Why Choose Our AI Resume Builder?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 space-y-2">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white overflow-hidden">
          <div className="absolute inset-0 text-white/[0.1]">
            <GridPattern className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Build Your Professional Resume?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of job seekers who have successfully landed their dream jobs using our AI-powered resume builder
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 rounded-full"
                  onClick={() => router.push('/resume')}
                >
                  Get Started Now
                </Button>
                <DonateButton variant="outline" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const features = [
  {
    title: 'AI-Powered Optimization',
    description: 'Our advanced AI technology helps you craft the perfect content tailored to your target role.',
    icon: Wand2,
  },
  {
    title: 'ATS-Friendly Templates',
    description: 'Choose from a variety of professional templates designed to pass Applicant Tracking Systems.',
    icon: LayoutTemplate,
  },
  {
    title: 'Quick & Easy',
    description: 'Create a professional resume in minutes with our intuitive builder and AI assistance.',
    icon: Clock,
  },
]

const stats = [
  { value: '10K+', label: 'Resumes Created' },
  { value: '95%', label: 'Success Rate' },
  { value: '24/7', label: 'AI Assistance' },
]