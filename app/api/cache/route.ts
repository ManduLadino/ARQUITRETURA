import { type NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"
import { getCacheStats, clearCache, refreshCacheEntries } from "@/lib/cache"

// This endpoint is for admin use only
// In a production environment, you should add authentication

export async function GET(request: NextRequest) {
  try {
    // Get cache statistics
    const stats = getCacheStats()

    return NextResponse.json({
      success: true,
      stats: {
        ...stats,
        oldestEntryDate: stats.oldestEntry ? new Date(stats.oldestEntry).toISOString() : null,
        newestEntryDate: stats.newestEntry ? new Date(stats.newestEntry).toISOString() : null,
        expirationDays: stats.expirationTime / (24 * 60 * 60 * 1000),
      },
    })
  } catch (error) {
    console.error("Error getting cache stats:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-api",
        action: "get-stats",
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get cache statistics",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Clear the cache
    clearCache()

    return NextResponse.json({
      success: true,
      message: "Cache cleared successfully",
    })
  } catch (error) {
    console.error("Error clearing cache:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-api",
        action: "clear-cache",
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear cache",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()

    if (action === "refresh") {
      // Refresh cache entries
      refreshCacheEntries()

      return NextResponse.json({
        success: true,
        message: "Cache entries refreshed successfully",
      })
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error performing cache action:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-api",
        action: "cache-action",
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to perform cache action",
      },
      { status: 500 },
    )
  }
}
