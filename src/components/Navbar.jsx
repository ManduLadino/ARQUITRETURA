"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./ui/Button"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white py-4 border-b border-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo no canto superior esquerdo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="BUSCARQ" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation - alinhado horizontalmente ao lado da logo */}
        <nav className="hidden md:flex items-center space-x-8 ml-12">
          <Link to="/busca" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Serviços
          </Link>
          <Link to="/sobre" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Sobre
          </Link>
          <Link to="/portfolio" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Portfólio
          </Link>
          <Link to="/contato" className="text-gray-600 hover:text-primary font-medium transition-colors">
            Contato
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/perfil" className="text-gray-600 hover:text-primary font-medium transition-colors">
                Meu Perfil
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="border-gray-300 text-gray-600 hover:bg-primary hover:text-secondary hover:border-primary transition-colors"
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-primary hover:text-secondary hover:border-primary transition-colors"
              >
                Entrar
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
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
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 px-4">
          <div className="py-2 space-y-2">
            <Link
              to="/busca"
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              to="/sobre"
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/portfolio"
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólio
            </Link>
            <Link
              to="/contato"
              className="block py-2 text-gray-600 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>

          <div className="pt-2 border-t border-gray-100 mt-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  className="block py-2 text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <button
                  className="block w-full text-left py-2 text-gray-600 hover:text-primary"
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-600 hover:text-primary"
              >
                Entrar
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
