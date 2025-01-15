import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from './utils/rate-limiter'

// List of paths that require rate limiting
const RATE_LIMITED_PATHS = [
  '/api/generate-ai-content',
  '/api/optimize-resume'
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Only apply rate limiting to specific API routes
  if (RATE_LIMITED_PATHS.includes(path)) {
    // Different rate limits for different endpoints
    const config = {
      '/api/generate-ai-content': { limit: 5, window: 300 },    // 5 requests per 5 minutes
      '/api/optimize-resume': { limit: 5, window: 300 }         // 5 requests per 5 minutes
    }

    const rateLimitResponse = await rateLimiter(request, config[path as keyof typeof config])
    
    if (rateLimitResponse) {
      return rateLimitResponse
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
