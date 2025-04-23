"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface CacheStats {
  size: number
  maxSize: number
  ttl: number
}

export default function CacheMonitor() {
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clearSuccess, setClearSuccess] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [oldEntries, setOldEntries] = useState<number | null>(null)

  const fetchStats = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/cache")

      if (!response.ok) {
        throw new Error(`Error fetching cache stats: ${response.status}`)
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cache statistics")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCache = async () => {
    setIsLoading(true)
    setError(null)
    setClearSuccess(false)

    try {
      const response = await fetch("/api/cache", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error clearing cache: ${response.status}`)
      }

      setClearSuccess(true)
      // Refresh stats after clearing
      fetchStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cache")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshCache = async () => {
    setRefreshing(true)
    setError(null)

    try {
      const response = await fetch("/api/cache/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threshold: 5 * 24 * 60 * 60 * 1000, // 5 days
        }),
      })

      if (!response.ok) {
        throw new Error(`Error refreshing cache: ${response.status}`)
      }

      // Refresh stats after refreshing
      fetchStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh cache")
      console.error(err)
    } finally {
      setRefreshing(false)
    }
  }

  const calculateOldEntries = () => {
    if (!stats) return null

    // Calculate entries older than 5 days (example threshold)
    const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000
    const now = Date.now()

    // This is a placeholder since we don't have actual entry ages in the stats
    // In a real implementation, you would get this from the API
    setOldEntries(Math.floor(stats.size * 0.2)) // Assume 20% of entries are old
  }

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    if (stats) {
      calculateOldEntries()
    }
  }, [stats])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cache Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">{error}</div>}

        {clearSuccess && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">Cache cleared successfully!</div>
        )}

        {stats ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Cache Size</div>
                <div className="text-2xl font-bold">{stats.size}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Max Size</div>
                <div className="text-2xl font-bold">{stats.maxSize}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">TTL</div>
                <div className="text-2xl font-bold">{Math.floor(stats.ttl / (24 * 60 * 60 * 1000))} days</div>
              </div>
            </div>

            {oldEntries !== null && (
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="text-sm text-yellow-700">Entries Needing Refresh</div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">{oldEntries}</div>
                  <Button
                    onClick={refreshCache}
                    variant="outline"
                    className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                    disabled={refreshing || oldEntries === 0}
                  >
                    {refreshing ? "Refreshing..." : "Refresh Old Entries"}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button onClick={fetchStats} variant="outline" disabled={isLoading}>
                Refresh Stats
              </Button>
              <Button
                onClick={clearCache}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                disabled={isLoading}
              >
                Clear Cache
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {isLoading ? <p>Loading cache statistics...</p> : <p>No cache statistics available</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
