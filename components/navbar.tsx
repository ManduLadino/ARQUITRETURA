"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/buscarq-logo.png"
              alt="BUSCARQ Logo"
              className="h-10 w-auto hover:scale-105 transition-transform"
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-buscarq-yellow relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-buscarq-yellow hover:after:w-full after:transition-all"
          >
            Início
          </Link>
          <Link
            href="#como-funciona"
            className="text-sm font-medium transition-colors hover:text-buscarq-yellow relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-buscarq-yellow hover:after:w-full after:transition-all"
          >
            Como Funciona
          </Link>
          <Link
            href="#recursos"
            className="text-sm font-medium transition-colors hover:text-buscarq-yellow relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-buscarq-yellow hover:after:w-full after:transition-all"
          >
            Recursos
          </Link>
          <Link
            href="/projeto"
            className="text-sm font-medium transition-colors hover:text-buscarq-yellow relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-buscarq-yellow hover:after:w-full after:transition-all"
          >
            Iniciar Projeto
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            asChild
            variant="default"
            className="hidden md:flex bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md transition-all"
          >
            <Link href="/projeto">Iniciar Projeto</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-buscarq-yellow/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 pb-6 animate-in slide-in-from-top">
            <Link
              href="/"
              className="text-sm font-medium p-2 rounded-md hover:bg-buscarq-yellow/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm font-medium p-2 rounded-md hover:bg-buscarq-yellow/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#recursos"
              className="text-sm font-medium p-2 rounded-md hover:bg-buscarq-yellow/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Recursos
            </Link>
            <Link
              href="/projeto"
              className="text-sm font-medium p-2 rounded-md hover:bg-buscarq-yellow/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Projeto
            </Link>
            <Button
              asChild
              variant="default"
              className="w-full mt-2 bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90"
            >
              <Link href="/projeto" onClick={() => setIsMenuOpen(false)}>
                Iniciar Projeto
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
