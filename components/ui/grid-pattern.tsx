'use client'

export function GridPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
    >
      <defs>
        <pattern
          id="grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0h1v1H0V0zm24 0h1v1h-1V0zM0 24h1v1H0v-1zm24 0h1v1h-1v-1z"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
} 