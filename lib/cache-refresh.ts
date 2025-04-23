import { responseCache } from "./cache"
import * as Sentry from "@sentry/nextjs"

/**
 * Refreshes cache entries to prevent expiration
 * @param refreshInterval How often to refresh entries (in milliseconds)
 * @param refreshThreshold Only refresh entries older than this threshold (in milliseconds)
 */
export async function setupCacheRefresh(
  refreshInterval: number = 12 * 60 * 60 * 1000, // Default: 12 hours
  refreshThreshold: number = 5 * 24 * 60 * 60 * 1000, // Default: 5 days
) {
  // Create a transaction for monitoring
  const transaction = Sentry.startTransaction({
    name: "cache_refresh_setup",
    op: "cache.maintenance",
  })

  try {
    // Log the setup
    console.log(`Setting up cache refresh: interval=${refreshInterval}ms, threshold=${refreshThreshold}ms`)

    // Set up the interval
    const intervalId = setInterval(() => {
      refreshCacheEntries(refreshThreshold)
    }, refreshInterval)

    // Return the interval ID so it can be cleared if needed
    transaction.setData("intervalId", intervalId)
    return intervalId
  } catch (error) {
    console.error("Error setting up cache refresh:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-refresh",
        action: "setup",
      },
    })
  } finally {
    transaction.finish()
  }
}

/**
 * Refreshes cache entries that are older than the threshold
 * @param ageThreshold Only refresh entries older than this threshold (in milliseconds)
 */
export async function refreshCacheEntries(ageThreshold: number = 5 * 24 * 60 * 60 * 1000) {
  // Create a transaction for monitoring
  const transaction = Sentry.startTransaction({
    name: "cache_refresh_execution",
    op: "cache.maintenance",
  })

  try {
    // Get cache statistics before refresh
    const beforeStats = responseCache.getStats()
    transaction.setData("before_stats", beforeStats)

    // Get entries to refresh
    const entriesToRefresh = responseCache.getEntriesOlderThan(ageThreshold)
    transaction.setData("entries_to_refresh", entriesToRefresh.length)

    if (entriesToRefresh.length === 0) {
      console.log("No cache entries need refreshing")
      return
    }

    console.log(`Refreshing ${entriesToRefresh.length} cache entries`)

    // Refresh each entry
    for (const entry of entriesToRefresh) {
      responseCache.refreshEntry(entry.key)
    }

    // Get cache statistics after refresh
    const afterStats = responseCache.getStats()
    transaction.setData("after_stats", afterStats)

    console.log(`Cache refresh complete. Refreshed ${entriesToRefresh.length} entries.`)
  } catch (error) {
    console.error("Error refreshing cache entries:", error)
    Sentry.captureException(error, {
      tags: {
        component: "cache-refresh",
        action: "refresh",
      },
    })
  } finally {
    transaction.finish()
  }
}
