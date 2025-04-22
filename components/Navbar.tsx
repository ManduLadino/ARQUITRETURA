"use client"

import { useState } from "react"
import Link from "next/link"
import Button from "./ui/Button"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth || { user: null, isAuthenticated: false, logout: () => {} }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="BUSCARQ" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">
              Início
            </Link>
            <Link href="/busca" className="text-gray-700 hover:text-primary font-medium">
              Buscar Arquitetos
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-primary font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-primary font-medium">
              Contato
            </Link>
            <Link href="/assistente" className="text-gray-700 hover:text-primary font-medium">
              Assistente
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/perfil" className="text-gray-700 hover:text-primary font-medium">
                  Meu Perfil
                </Link>
                <Button variant="outline" onClick={logout}>
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="primary">Entrar</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              href="/"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/busca"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Buscar Arquitetos
            </Link>
            <Link
              href="/sobre"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="/assistente"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Assistente
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/perfil"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-2">
                <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
