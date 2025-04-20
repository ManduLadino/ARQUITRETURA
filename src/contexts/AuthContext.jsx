"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Cria o contexto
const AuthContext = createContext(null)

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext)

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    // Simulação: verificar se há um usuário no localStorage
    const storedUser = localStorage.getItem("buscarq_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Função de login
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("buscarq_user", JSON.stringify(userData))
    return true
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("buscarq_user")
  }

  // Função de registro
  const register = (userData) => {
    // Em uma aplicação real, você enviaria esses dados para o backend
    // Aqui estamos apenas simulando um registro bem-sucedido
    setUser(userData)
    localStorage.setItem("buscarq_user", JSON.stringify(userData))
    return true
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
