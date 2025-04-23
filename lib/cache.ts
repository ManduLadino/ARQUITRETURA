import * as Sentry from "@sentry/nextjs"

interface CacheEntry {
  response: string
  timestamp: number
  expiresAt: number
}

// In-memory cache for development and testing
// In production, consider using Redis, Upstash, or another persistent cache
const memoryCache: Map<string, CacheEntry> = new Map()

// Cache expiration time (7 days in milliseconds)
const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000

/**
 * Normalize a question for cache key generation
 * This helps match similar questions
 */
export function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Normalize whitespace
}

/**
 * Generate a cache key from a question
 */
export function generateCacheKey(question: string, image?: string): string {
  const normalized = normalizeQuestion(question)

  // For text-only queries, use the normalized question
  if (!image) {
    return `chat:${normalized}`
  }

  // For image analysis, include a hash of the image
  // We only use the first 50 chars of the image data to keep the key manageable
  const imageHash = image.substring(0, 50)
  return `chat:${normalized}:img:${imageHash}`
}

/**
 * Check if a response is cached for a given question
 */
export function getCachedResponse(question: string, image?: string): string | null {
  try {
    const key = generateCacheKey(question, image)
    const cached = memoryCache.get(key)

    if (!cached) {
      return null
    }

    // Check if cache has expired
    if (Date.now() > cached.expiresAt) {
      memoryCache.delete(key)
      return null
    }

    // Log cache hit for monitoring
    Sentry.addBreadcrumb({
      category: "cache",
      message: "Cache hit",
      data: {
        question,
        hasImage: !!image,
        key,
      },
      level: "info",
    })

    return cached.response
  } catch (error) {
    // Log cache error but don't fail the request
    console.error("Cache error:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache",
        operation: "get",
      },
    })
    return null
  }
}

/**
 * Cache a response for a given question
 */
export function cacheResponse(question: string, response: string, image?: string): void {
  try {
    const key = generateCacheKey(question, image)
    const now = Date.now()

    memoryCache.set(key, {
      response,
      timestamp: now,
      expiresAt: now + CACHE_EXPIRATION,
    })

    // Log cache set for monitoring
    Sentry.addBreadcrumb({
      category: "cache",
      message: "Cache set",
      data: {
        question,
        hasImage: !!image,
        key,
      },
      level: "info",
    })
  } catch (error) {
    // Log cache error but don't fail the request
    console.error("Cache error:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache",
        operation: "set",
      },
    })
  }
}

/**
 * Clear expired cache entries
 */
export function clearExpiredCache(): void {
  try {
    const now = Date.now()
    let expiredCount = 0

    for (const [key, entry] of memoryCache.entries()) {
      if (now > entry.expiresAt) {
        memoryCache.delete(key)
        expiredCount++
      }
    }

    if (expiredCount > 0) {
      Sentry.addBreadcrumb({
        category: "cache",
        message: "Cleared expired cache entries",
        data: {
          expiredCount,
          remainingCount: memoryCache.size,
        },
        level: "info",
      })
    }
  } catch (error) {
    console.error("Error clearing expired cache:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache",
        operation: "clear-expired",
      },
    })
  }
}

/**
 * Refresh cache entries to prevent expiration
 * This function extends the expiration time for frequently accessed entries
 */
export function refreshCacheEntries(): void {
  try {
    const now = Date.now()
    let refreshedCount = 0

    // Get entries that are more than halfway to expiration
    const halfwayPoint = CACHE_EXPIRATION / 2

    for (const [key, entry] of memoryCache.entries()) {
      const age = now - entry.timestamp

      // If the entry is more than halfway to expiration, refresh it
      if (age > halfwayPoint) {
        entry.expiresAt = now + CACHE_EXPIRATION
        refreshedCount++
      }
    }

    if (refreshedCount > 0) {
      Sentry.addBreadcrumb({
        category: "cache",
        message: "Refreshed cache entries",
        data: {
          refreshedCount,
          totalCount: memoryCache.size,
        },
        level: "info",
      })
    }
  } catch (error) {
    console.error("Error refreshing cache entries:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache",
        operation: "refresh-entries",
      },
    })
  }
}

/**
 * Clear the entire cache
 */
export function clearCache(): void {
  try {
    const size = memoryCache.size
    memoryCache.clear()

    Sentry.addBreadcrumb({
      category: "cache",
      message: "Cache cleared",
      data: {
        previousSize: size,
      },
      level: "info",
    })
  } catch (error) {
    console.error("Error clearing cache:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache",
        operation: "clear",
      },
    })
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  size: number
  oldestEntry: number | null
  newestEntry: number | null
  expirationTime: number
} {
  let oldestTimestamp = Number.POSITIVE_INFINITY
  let newestTimestamp = 0

  for (const entry of memoryCache.values()) {
    if (entry.timestamp < oldestTimestamp) {
      oldestTimestamp = entry.timestamp
    }
    if (entry.timestamp > newestTimestamp) {
      newestTimestamp = entry.timestamp
    }
  }

  return {
    size: memoryCache.size,
    oldestEntry: oldestTimestamp !== Number.POSITIVE_INFINITY ? oldestTimestamp : null,
    newestEntry: newestTimestamp !== 0 ? newestTimestamp : null,
    expirationTime: CACHE_EXPIRATION,
  }
}

/**
 * Get entries older than a certain age
 */
function getEntriesOlderThan(age: number): { key: string; age: number }[] {
  const now = Date.now()
  const oldEntries: { key: string; age: number }[] = []

  for (const [key, entry] of memoryCache.entries()) {
    const entryAge = now - entry.timestamp
    if (entryAge > age) {
      oldEntries.push({ key, age: entryAge })
    }
  }

  return oldEntries
}

/**
 * Refresh a cache entry (update its timestamp and expiration)
 */
function refreshEntry(key: string): boolean {
  const entry = memoryCache.get(key)

  if (!entry) {
    return false
  }

  const now = Date.now()
  memoryCache.set(key, {
    ...entry,
    timestamp: now,
    expiresAt: now + CACHE_EXPIRATION,
  })

  // Log cache refresh to Sentry for monitoring
  Sentry.addBreadcrumb({
    category: "cache",
    message: "Cache entry refreshed",
    data: {
      key,
      previousTimestamp: entry.timestamp,
      newTimestamp: now,
    },
    level: "info",
  })

  return true
}

/**
 * Get all cache entries
 */
function getAllEntries(): { key: string; timestamp: number; expiresAt: number }[] {
  return Array.from(memoryCache.entries()).map(([key, entry]) => ({
    key,
    timestamp: entry.timestamp,
    expiresAt: entry.expiresAt,
  }))
}

// Run cache cleanup and refresh periodically
if (typeof window === "undefined") {
  // Only run on server
  // Clear expired entries every hour
  setInterval(clearExpiredCache, 60 * 60 * 1000)

  // Refresh cache entries every 12 hours
  setInterval(refreshCacheEntries, 12 * 60 * 60 * 1000)
}

export const responseCache = {
  get: getCachedResponse,
  set: cacheResponse,
  clear: clearCache,
  clearExpired: clearExpiredCache,
  refresh: refreshCacheEntries,
  generateKey: generateCacheKey,
  getStats: getCacheStats,
  normalizeQuestion: normalizeQuestion,
  getEntriesOlderThan: getEntriesOlderThan,
  refreshEntry: refreshEntry,
  getAllEntries: getAllEntries,
}
