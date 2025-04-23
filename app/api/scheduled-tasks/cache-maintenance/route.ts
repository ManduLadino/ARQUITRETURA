import { NextResponse } from "next/server"
import { refreshCacheEntries } from "@/lib/cache-refresh"
import * as Sentry from "@sentry/nextjs"

// This endpoint is for scheduled tasks
// It can be called by a cron job to perform regular cache maintenance

export async function GET() {
  const transaction = Sentry.startTransaction({
    name: "scheduled_cache_maintenance",
    op: "cron.task",
  })

  try {
    // Refresh cache entries older than 5 days
    await refreshCacheEntries(5 * 24 * 60 * 60 * 1000)

    transaction.setStatus("ok")
    return NextResponse.json({
      success: true,
      message: "Cache maintenance completed successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error during scheduled cache maintenance:", error)
    Sentry.captureException(error, {
      tags: {
        component: "scheduled-tasks",
        task: "cache-maintenance",
      },
    })

    transaction.setStatus("error")
    return NextResponse.json(
      {
        success: false,
        error: "Failed to complete cache maintenance",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  } finally {
    transaction.finish()
  }
}
