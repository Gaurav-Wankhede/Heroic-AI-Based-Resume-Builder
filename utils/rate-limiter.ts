import { NextRequest, NextResponse } from 'next/server'

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimit = new Map<string, RateLimitInfo>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now >= value.resetTime) {
      rateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  limit: number      // Number of requests allowed
  window: number     // Time window in seconds
}

export async function rateLimiter(
  req: NextRequest,
  config: RateLimitConfig = { limit: 5, window: 300 } // Default: 5 requests per 5 minutes
) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous'
    const key = `rate-limit:${ip}`
    const now = Date.now()

    // Get current rate limit info or create new
    let rateLimitInfo = rateLimit.get(key)
    if (!rateLimitInfo || now >= rateLimitInfo.resetTime) {
      rateLimitInfo = {
        count: 0,
        resetTime: now + (config.window * 1000)
      }
    }

    // Increment count
    rateLimitInfo.count++
    rateLimit.set(key, rateLimitInfo)

    // Set rate limit headers
    const headers = new Headers()
    headers.set('X-RateLimit-Limit', config.limit.toString())
    headers.set('X-RateLimit-Remaining', Math.max(0, config.limit - rateLimitInfo.count).toString())
    headers.set('X-RateLimit-Reset', Math.floor(rateLimitInfo.resetTime / 1000).toString())

    if (rateLimitInfo.count > config.limit) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: `Please wait ${Math.ceil((rateLimitInfo.resetTime - now) / 1000)} seconds before making another request.`
        }),
        {
          status: 429,
          headers,
        }
      )
    }

    return null // No rate limit exceeded
  } catch (error) {
    console.error('Rate limiter error:', error)
    return null // Fail open if rate limiter has an error
  }
}
