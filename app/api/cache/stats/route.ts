import { NextResponse } from "next/server"
import { responseCache } from "@/lib/cache"
import * as Sentry from "@sentry/nextjs"

// This endpoint provides detailed cache statistics for monitoring

export async function GET() {
  try {
    // Get basic cache statistics
    const stats = responseCache.getStats()

    // Get entries older than certain thresholds
    const now = Date.now()
    const oneDayAgo = now - 24 * 60 * 60 * 1000
    const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000

    const oldEntries = responseCache.getEntriesOlderThan(oneDayAgo)
    const veryOldEntries = responseCache.getEntriesOlderThan(threeDaysAgo)
    const criticalEntries = responseCache.getEntriesOlderThan(fiveDaysAgo)

    // Calculate age distribution
    const ageDistribution = {
      lessThanOneDay: stats.size - oldEntries.length,
      oneTothreeDays: oldEntries.length - veryOldEntries.length,
      threeToFiveDays: veryOldEntries.length - criticalEntries.length,
      moreThanFiveDays: criticalEntries.length,
    }

    return NextResponse.json({
      success: true,
      stats,
      ageDistribution,
      oldestEntries: criticalEntries.slice(0, 10).map((entry) => ({
        key: entry.key.substring(0, 50) + (entry.key.length > 50 ? "..." : ""),
        ageInDays: Math.floor(entry.age / (24 * 60 * 60 * 1000)),
      })),
    })
  } catch (error) {
    console.error("Error getting detailed cache stats:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-api",
        action: "get-detailed-stats",
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get detailed cache statistics",
      },
      { status: 500 },
    )
  }
}
