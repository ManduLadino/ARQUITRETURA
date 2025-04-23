import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatWidget from "@/components/ChatWidget"
import { checkApplicationHealth } from "@/lib/monitoring"
import "@/styles/globals.css"
import { initCacheRefresh } from "@/lib/init-cache-refresh"

// Check application health on startup
if (typeof window === "undefined") {
  checkApplicationHealth()
  // Initialize cache refresh mechanism
  initCacheRefresh()
}

export const metadata: Metadata = {
  title: "BUSCARQ - Conectando Arquitetos e Clientes",
  description: "Encontre o arquiteto ideal para o seu projeto",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
