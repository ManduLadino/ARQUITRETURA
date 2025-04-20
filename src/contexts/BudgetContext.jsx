"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

// Criação do contexto
const BudgetContext = createContext(null)

// Hook personalizado para usar o contexto
export const useBudget = () => useContext(BudgetContext)

// Gerador de ID único simples
const generateId = () => Math.random().toString(36).substring(2, 9)

// Status possíveis de um orçamento
export const BUDGET_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  SUBMITTED: "submitted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  CANCELED: "canceled",
}

// Provedor do contexto
export const BudgetProvider = ({ children }) => {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar orçamentos do localStorage ao iniciar
  useEffect(() => {
    const storedBudgets = localStorage.getItem("buscarq_budgets")
    if (storedBudgets) {
      setBudgets(JSON.parse(storedBudgets))
    }
    setIsLoading(false)
  }, [])

  // Salvar orçamentos no localStorage quando houver mudanças
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("buscarq_budgets", JSON.stringify(budgets))
    }
  }, [budgets, isLoading])

  // Criar um novo orçamento
  const createBudget = (budgetData) => {
    const newBudget = {
      id: generateId(),
      clientId: user.id,
      clientName: user.name,
      status: BUDGET_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...budgetData,
    }

    setBudgets((prev) => [...prev, newBudget])
    return newBudget.id
  }

  // Atualizar um orçamento existente
  const updateBudget = (id, updatedData) => {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === id
          ? {
              ...budget,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : budget,
      ),
    )
  }

  // Atualizar apenas o status de um orçamento
  const updateBudgetStatus = (id, status) => {
    updateBudget(id, { status })
  }

  // Obter um orçamento específico pelo ID
  const getBudget = (id) => {
    return budgets.find((budget) => budget.id === id)
  }

  // Obter orçamentos filtrados por diversos critérios
  const getBudgets = ({ clientId, architectId, status, sortBy = "updatedAt", sortDirection = "desc" } = {}) => {
    let filtered = [...budgets]

    // Filtrar por clientId se fornecido
    if (clientId) {
      filtered = filtered.filter((budget) => budget.clientId === clientId)
    }

    // Filtrar por architectId se fornecido
    if (architectId) {
      filtered = filtered.filter((budget) => budget.architectId === architectId)
    }

    // Filtrar por status se fornecido
    if (status) {
      // Se status for um array, filtrar por qualquer um dos status
      if (Array.isArray(status)) {
        filtered = filtered.filter((budget) => status.includes(budget.status))
      } else {
        filtered = filtered.filter((budget) => budget.status === status)
      }
    }

    // Ordenar
    filtered.sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      // Ordenação padrão para datas e strings
      if (sortDirection === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
      }
    })

    return filtered
  }

  // Obter orçamentos do usuário atual (cliente ou arquiteto)
  const getUserBudgets = (status) => {
    if (!user) return []

    if (user.userType === "client") {
      return getBudgets({ clientId: user.id, status })
    } else if (user.userType === "architect") {
      return getBudgets({ architectId: user.id, status })
    }

    return []
  }

  // Deletar um orçamento
  const deleteBudget = (id) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id))
  }

  const value = {
    budgets,
    isLoading,
    createBudget,
    updateBudget,
    updateBudgetStatus,
    getBudget,
    getBudgets,
    getUserBudgets,
    deleteBudget,
  }

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
}

export default BudgetContext
