export function TechStackIcon({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      className={className}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2h8" />
      <path d="M9 2v4" />
      <path d="M15 2v4" />
      <path d="M12 17v4" />
      <path d="M3 7h18" />
      <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <path d="m8 12 3 3 5-5" />
    </svg>
  )
} 