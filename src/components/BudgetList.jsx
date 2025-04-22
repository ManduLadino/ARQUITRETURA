"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/Card"
import Button from "./ui/Button"
import { useBudget, BUDGET_STATUS } from "../contexts/BudgetContext"
import { useAuth } from "../contexts/AuthContext"
import BudgetDetails from "./BudgetDetails"

// Mapeamento de status para nomes amigáveis
const statusNames = {
  [BUDGET_STATUS.PENDING]: "Pendente",
  [BUDGET_STATUS.IN_PROGRESS]: "Em análise",
  [BUDGET_STATUS.SUBMITTED]: "Orçamento enviado",
  [BUDGET_STATUS.ACCEPTED]: "Aceito",
  [BUDGET_STATUS.REJECTED]: "Recusado",
  [BUDGET_STATUS.CANCELED]: "Cancelado",
}

// Função para formatar data
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString("pt-BR", options)
}

const BudgetList = () => {
  const { getUserBudgets } = useBudget()
  const { user } = useAuth()
  const [selectedBudgetId, setSelectedBudgetId] = useState(null)
  const [statusFilter, setStatusFilter] = useState("active")

  // Determinar quais status são considerados "ativos" vs "arquivados"
  const activeStatuses = [BUDGET_STATUS.PENDING, BUDGET_STATUS.IN_PROGRESS, BUDGET_STATUS.SUBMITTED]

  const archivedStatuses = [BUDGET_STATUS.ACCEPTED, BUDGET_STATUS.REJECTED, BUDGET_STATUS.CANCELED]

  // Aplicar filtro de status
  const filteredBudgets = getUserBudgets(statusFilter === "active" ? activeStatuses : archivedStatuses)

  const viewBudgetDetails = (budgetId) => {
    setSelectedBudgetId(budgetId)
  }

  const closeDetails = () => {
    setSelectedBudgetId(null)
  }

  // Se estiver visualizando detalhes de um orçamento
  if (selectedBudgetId) {
    return <BudgetDetails budgetId={selectedBudgetId} onClose={closeDetails} />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Meus Orçamentos</h2>
        <div className="flex space-x-2">
          <Button
            variant={statusFilter === "active" ? "primary" : "outline"}
            onClick={() => setStatusFilter("active")}
            size="sm"
          >
            Ativos
          </Button>
          <Button
            variant={statusFilter === "archived" ? "primary" : "outline"}
            onClick={() => setStatusFilter("archived")}
            size="sm"
          >
            Arquivados
          </Button>
        </div>
      </div>

      {filteredBudgets.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">
              {statusFilter === "active"
                ? "Você não possui orçamentos ativos no momento."
                : "Você não possui orçamentos arquivados no momento."}
            </p>
            {user.userType === "client" && statusFilter === "active" && (
              <p className="text-gray-700">Visite o perfil de um arquiteto para solicitar um orçamento.</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBudgets.map((budget) => (
            <Card key={budget.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-lg">
                      {user.userType === "client"
                        ? `Orçamento com ${budget.architectName}`
                        : `Orçamento para ${budget.clientName}`}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      {budget.projectType} • {budget.location}
                    </p>
                    <p className="text-gray-500 text-sm">Solicitado em {formatDate(budget.createdAt)}</p>
                  </div>
                  <div className="flex flex-col md:items-end justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        budget.status === BUDGET_STATUS.ACCEPTED
                          ? "bg-green-100 text-green-800"
                          : budget.status === BUDGET_STATUS.REJECTED || budget.status === BUDGET_STATUS.CANCELED
                            ? "bg-red-100 text-red-800"
                            : budget.status === BUDGET_STATUS.SUBMITTED
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {statusNames[budget.status]}
                    </span>
                    <Button onClick={() => viewBudgetDetails(budget.id)} className="mt-2">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default BudgetList
