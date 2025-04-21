import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatWidget from "@/components/ChatWidget"
import "@/styles/globals.css"

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
