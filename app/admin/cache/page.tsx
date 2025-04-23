"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Button from "@/components/ui/Button"

interface CacheStats {
  size: number
  oldestEntry: number | null
  newestEntry: number | null
  oldestEntryDate: string | null
  newestEntryDate: string | null
  expirationDays: number
}

export default function CacheAdminPage() {
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch("/api/cache")

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      } else {
        throw new Error(data.error || "Failed to fetch cache statistics")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cache statistics")
      console.error("Error fetching cache stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const clearCache = async () => {
    try {
      setActionLoading(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch("/api/cache", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        setSuccessMessage("Cache cleared successfully")
        // Refresh stats after clearing
        fetchStats()
      } else {
        throw new Error(data.error || "Failed to clear cache")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cache")
      console.error("Error clearing cache:", err)
    } finally {
      setActionLoading(false)
    }
  }

  const refreshCache = async () => {
    try {
      setActionLoading(true)
      setError(null)
      setSuccessMessage(null)

      const response = await fetch("/api/cache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "refresh" }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        setSuccessMessage("Cache entries refreshed successfully")
        // Refresh stats after refreshing
        fetchStats()
      } else {
        throw new Error(data.error || "Failed to refresh cache entries")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh cache entries")
      console.error("Error refreshing cache entries:", err)
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Cache</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Tamanho do Cache</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{loading ? "..." : stats?.size || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Total de respostas em cache</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entrada Mais Antiga</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              {loading
                ? "..."
                : stats?.oldestEntryDate
                  ? new Date(stats.oldestEntryDate).toLocaleString()
                  : "Nenhuma entrada"}
            </p>
            <p className="text-sm text-gray-500 mt-2">Resposta mais antiga em cache</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entrada Mais Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              {loading
                ? "..."
                : stats?.newestEntryDate
                  ? new Date(stats.newestEntryDate).toLocaleString()
                  : "Nenhuma entrada"}
            </p>
            <p className="text-sm text-gray-500 mt-2">Resposta mais recente em cache</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo de Expiração</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{loading ? "..." : stats?.expirationDays || 0} dias</p>
            <p className="text-sm text-gray-500 mt-2">Tempo até a expiração do cache</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button onClick={refreshCache} variant="outline" disabled={actionLoading || loading}>
          {actionLoading ? "Processando..." : "Atualizar Cache"}
        </Button>
        <Button onClick={fetchStats} variant="outline" disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar Estatísticas"}
        </Button>
        <Button
          onClick={clearCache}
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
          disabled={actionLoading || loading}
        >
          {actionLoading ? "Processando..." : "Limpar Cache"}
        </Button>
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sobre o Sistema de Cache</h2>
        <p className="mb-4">
          O assistente BUSCARQ utiliza um sistema de cache para melhorar o desempenho e reduzir chamadas de API.
          Perguntas comuns e suas respostas são armazenadas em memória para recuperação rápida.
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Benefícios:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tempos de resposta mais rápidos para perguntas comuns</li>
          <li>Redução de custos de API</li>
          <li>Melhor experiência do usuário</li>
          <li>Menor carga no servidor</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4 mb-2">Configurações do Cache:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>As entradas do cache expiram após 7 dias</li>
          <li>As entradas são atualizadas automaticamente a cada 12 horas</li>
          <li>As entradas mais antigas são removidas primeiro quando o cache está cheio</li>
          <li>O sistema limpa automaticamente entradas expiradas a cada hora</li>
        </ul>
      </div>
    </div>
  )
}
