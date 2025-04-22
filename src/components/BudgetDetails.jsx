"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import Button from "./ui/Button"
import { useBudget, BUDGET_STATUS } from "../contexts/BudgetContext"
import { useAuth } from "../contexts/AuthContext"

// Mapeamento de status para nomes amigáveis
const statusNames = {
  [BUDGET_STATUS.PENDING]: "Pendente",
  [BUDGET_STATUS.IN_PROGRESS]: "Em análise",
  [BUDGET_STATUS.SUBMITTED]: "Orçamento enviado",
  [BUDGET_STATUS.ACCEPTED]: "Aceito",
  [BUDGET_STATUS.REJECTED]: "Recusado",
  [BUDGET_STATUS.CANCELED]: "Cancelado",
}

// Mapeamento de tipos de projeto para nomes amigáveis
const projectTypeNames = {
  residential: "Residencial",
  commercial: "Comercial",
  interior: "Design de Interiores",
  renovation: "Reforma",
  landscape: "Paisagismo",
  other: "Outro",
}

// Mapeamento de prazos para nomes amigáveis
const timelineNames = {
  urgent: "Urgente (menos de 1 mês)",
  short: "Curto prazo (1-3 meses)",
  medium: "Médio prazo (3-6 meses)",
  long: "Longo prazo (mais de 6 meses)",
  flexible: "Flexível",
}

// Mapeamento de orçamentos para nomes amigáveis
const budgetRangeNames = {
  under5k: "Até R$ 5.000",
  "5kto15k": "R$ 5.000 - R$ 15.000",
  "15kto30k": "R$ 15.000 - R$ 30.000",
  "30kto50k": "R$ 30.000 - R$ 50.000",
  "50kto100k": "R$ 50.000 - R$ 100.000",
  above100k: "Acima de R$ 100.000",
  flexible: "Flexível/A discutir",
}

// Função para formatar data
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("pt-BR", options)
}

const BudgetDetails = ({ budgetId, onClose }) => {
  const { getBudget, updateBudget, updateBudgetStatus } = useBudget()
  const { user } = useAuth()
  const budget = getBudget(budgetId)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    estimatedValue: budget?.estimatedValue || "",
    estimatedTime: budget?.estimatedTime || "",
    notes: budget?.notes || "",
  })

  // Verificar se o orçamento existe
  if (!budget) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Orçamento não encontrado.</p>
          <Button onClick={onClose} className="mt-4">
            Voltar
          </Button>
        </CardContent>
      </Card>
    )
  }

  const isClient = user?.userType === "client"
  const isArchitect = user?.userType === "architect"

  // Verificar se o usuário é o cliente ou o arquiteto deste orçamento
  const isOwner = (isClient && budget.clientId === user.id) || (isArchitect && budget.architectId === user.id)

  if (!isOwner) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Você não tem permissão para visualizar este orçamento.</p>
          <Button onClick={onClose} className="mt-4">
            Voltar
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Funções para lidar com a atualização do orçamento
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitEstimate = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    updateBudget(budget.id, {
      ...formData,
      status: BUDGET_STATUS.SUBMITTED,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setIsEditing(false)
    }, 500)
  }

  const handleStatusChange = (newStatus) => {
    setIsSubmitting(true)
    updateBudgetStatus(budget.id, newStatus)

    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Detalhes do Orçamento</CardTitle>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Informações do Solicitante/Arquiteto */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{isClient ? "Arquiteto" : "Solicitante"}</h3>
            <p className="text-gray-700">{isClient ? budget.architectName : budget.clientName}</p>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Data da Solicitação</h4>
              <p>{formatDate(budget.createdAt)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Última Atualização</h4>
              <p>{formatDate(budget.updatedAt)}</p>
            </div>
          </div>

          {/* Detalhes do Projeto */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Detalhes do Projeto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700">Tipo de Projeto</h4>
                <p>{projectTypeNames[budget.projectType] || budget.projectType}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Tamanho do Projeto</h4>
                <p>{budget.projectSize}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Localização</h4>
                <p>{budget.location}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Prazo Desejado</h4>
                <p>{timelineNames[budget.timeline] || "Não especificado"}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Orçamento Estimado</h4>
                <p>{budgetRangeNames[budget.budget] || "Não especificado"}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Descrição</h4>
              <p className="whitespace-pre-line">{budget.description}</p>
            </div>
          </div>

          {/* Resposta do Arquiteto (se houver) */}
          {(budget.status === BUDGET_STATUS.SUBMITTED ||
            budget.status === BUDGET_STATUS.ACCEPTED ||
            budget.status === BUDGET_STATUS.REJECTED) && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Resposta do Arquiteto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700">Valor Estimado</h4>
                  <p>{budget.estimatedValue}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Tempo Estimado</h4>
                  <p>{budget.estimatedTime}</p>
                </div>
              </div>

              {budget.notes && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700">Observações</h4>
                  <p className="whitespace-pre-line">{budget.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Formulário de envio de orçamento (apenas para arquitetos) */}
          {isArchitect && (budget.status === BUDGET_STATUS.PENDING || budget.status === BUDGET_STATUS.IN_PROGRESS) && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Responder Solicitação</h3>

              {!isEditing ? (
                <div className="space-x-3">
                  <Button
                    onClick={() => {
                      if (budget.status === BUDGET_STATUS.PENDING) {
                        handleStatusChange(BUDGET_STATUS.IN_PROGRESS)
                      } else {
                        setIsEditing(true)
                      }
                    }}
                  >
                    {budget.status === BUDGET_STATUS.PENDING ? "Começar a Analisar" : "Enviar Orçamento"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => handleStatusChange(BUDGET_STATUS.REJECTED)}
                  >
                    Recusar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEstimate} className="space-y-4">
                  <div>
                    <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Estimado*
                    </label>
                    <input
                      id="estimatedValue"
                      name="estimatedValue"
                      type="text"
                      required
                      value={formData.estimatedValue}
                      onChange={handleChange}
                      placeholder="Ex: R$ 15.000,00"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Tempo Estimado*
                    </label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      required
                      value={formData.estimatedTime}
                      onChange={handleChange}
                      placeholder="Ex: 2 meses"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Detalhes adicionais sobre o orçamento..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar Orçamento"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Ações para Cliente */}
          {isClient && budget.status === BUDGET_STATUS.SUBMITTED && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Ações Disponíveis</h3>
              <div className="space-x-3">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleStatusChange(BUDGET_STATUS.ACCEPTED)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Aceitar Orçamento"}
                </Button>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                  onClick={() => handleStatusChange(BUDGET_STATUS.REJECTED)}
                  disabled={isSubmitting}
                >
                  Recusar
                </Button>
              </div>
            </div>
          )}

          {/* Botão para cancelar (apenas para pedidos pendentes) */}
          {(budget.status === BUDGET_STATUS.PENDING || budget.status === BUDGET_STATUS.IN_PROGRESS) && isClient && (
            <div className="border-t pt-4">
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => handleStatusChange(BUDGET_STATUS.CANCELED)}
                disabled={isSubmitting}
              >
                Cancelar Solicitação
              </Button>
            </div>
          )}

          {/* Botão para voltar */}
          <div className="pt-4">
            <Button variant="outline" onClick={onClose}>
              Voltar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetDetails
