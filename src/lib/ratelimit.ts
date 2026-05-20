import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Fallback in-memory rate limiter if Upstash is not configured
class InMemoryRateLimiter {
  private store = new Map<string, number[]>();

  constructor(private limit: number, private windowMs: number) {}

  limitAction(ip: string) {
    const now = Date.now();
    const timestamps = this.store.get(ip) || [];
    
    // Clean up old timestamps
    const validTimestamps = timestamps.filter(t => now - t < this.windowMs);
    
    if (validTimestamps.length >= this.limit) {
      return { success: false };
    }
    
    validTimestamps.push(now);
    this.store.set(ip, validTimestamps);
    return { success: true };
  }
}

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// 5 attempts per 10 minutes
export const loginRateLimiter = hasUpstash 
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "ratelimit:login",
    })
  : { limit: async (ip: string) => new InMemoryRateLimiter(5, 10 * 60 * 1000).limitAction(ip) };

// 3 attempts per 15 minutes
export const forgotPasswordRateLimiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(3, "15 m"),
      analytics: true,
      prefix: "ratelimit:forgotpw",
    })
  : { limit: async (ip: string) => new InMemoryRateLimiter(3, 15 * 60 * 1000).limitAction(ip) };

// 5 attempts per 15 minutes for email verification
export const verifyEmailRateLimiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      analytics: true,
      prefix: "ratelimit:verifyemail",
    })
  : { limit: async (ip: string) => new InMemoryRateLimiter(5, 15 * 60 * 1000).limitAction(ip) };
