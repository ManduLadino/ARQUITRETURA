import { type NextRequest, NextResponse } from "next/server"
import { refreshCacheEntries } from "@/lib/cache-refresh"
import * as Sentry from "@sentry/nextjs"

// This endpoint is for admin use only
// It allows refreshing cache entries to prevent expiration

export async function POST(request: NextRequest) {
  try {
    // Get the threshold from the request body or use default (5 days)
    const { threshold = 5 * 24 * 60 * 60 * 1000 } = await request.json().catch(() => ({}))

    // Refresh cache entries
    await refreshCacheEntries(threshold)

    return NextResponse.json({
      success: true,
      message: "Cache entries refreshed successfully",
    })
  } catch (error) {
    console.error("Error refreshing cache entries:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-api",
        action: "refresh-cache",
      },
    })

    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh cache entries",
      },
      { status: 500 },
    )
  }
}
