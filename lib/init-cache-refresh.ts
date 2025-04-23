import { setupCacheRefresh } from "./cache-refresh"

// This function initializes the cache refresh mechanism
// It should be called once during application startup
export function initCacheRefresh() {
  // Set up cache refresh to run every 12 hours
  // and refresh entries older than 5 days
  const refreshInterval = 12 * 60 * 60 * 1000 // 12 hours
  const refreshThreshold = 5 * 24 * 60 * 60 * 1000 // 5 days

  return setupCacheRefresh(refreshInterval, refreshThreshold)
}
