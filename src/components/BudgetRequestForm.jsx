"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"
import Input from "./ui/Input"
import { useBudget } from "../contexts/BudgetContext"
import { useAuth } from "../contexts/AuthContext"

const BudgetRequestForm = ({ architectId, architectName, onSuccess, onCancel }) => {
  const navigate = useNavigate()
  const { createBudget } = useBudget()
  const { user, isAuthenticated } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    projectType: "",
    projectSize: "",
    location: "",
    timeline: "",
    budget: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      setError("Você precisa estar logado para solicitar um orçamento.")
      setIsSubmitting(false)
      return
    }

    // Verificar se o usuário é um cliente
    if (user.userType !== "client") {
      setError("Apenas clientes podem solicitar orçamentos.")
      setIsSubmitting(false)
      return
    }

    try {
      // Criar novo orçamento
      createBudget({
        ...formData,
        architectId,
        architectName,
      })

      // Simular atraso para exibir que está sendo enviado
      setTimeout(() => {
        setIsSubmitting(false)

        // Chamar callback de sucesso ou redirecionar
        if (onSuccess) {
          onSuccess()
        } else {
          navigate("/perfil/orcamentos")
        }
      }, 1000)
    } catch (err) {
      setError("Ocorreu um erro ao solicitar o orçamento. Tente novamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Solicitar Orçamento</h2>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Projeto*
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
            >
              <option value="">Selecione uma opção</option>
              <option value="residential">Residencial</option>
              <option value="commercial">Comercial</option>
              <option value="interior">Design de Interiores</option>
              <option value="renovation">Reforma</option>
              <option value="landscape">Paisagismo</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectSize" className="block text-sm font-medium text-gray-700 mb-1">
              Tamanho do Projeto (m²)*
            </label>
            <Input
              id="projectSize"
              name="projectSize"
              type="text"
              value={formData.projectSize}
              onChange={handleChange}
              required
              placeholder="Ex: 100 m²"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localização*
            </label>
            <Input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Cidade/Estado"
            />
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
              Prazo Desejado
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
            >
              <option value="">Selecione uma opção</option>
              <option value="urgent">Urgente (menos de 1 mês)</option>
              <option value="short">Curto prazo (1-3 meses)</option>
              <option value="medium">Médio prazo (3-6 meses)</option>
              <option value="long">Longo prazo (mais de 6 meses)</option>
              <option value="flexible">Flexível</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Orçamento Estimado
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
            >
              <option value="">Selecione uma opção</option>
              <option value="under5k">Até R$ 5.000</option>
              <option value="5kto15k">R$ 5.000 - R$ 15.000</option>
              <option value="15kto30k">R$ 15.000 - R$ 30.000</option>
              <option value="30kto50k">R$ 30.000 - R$ 50.000</option>
              <option value="50kto100k">R$ 50.000 - R$ 100.000</option>
              <option value="above100k">Acima de R$ 100.000</option>
              <option value="flexible">Flexível/A discutir</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição do Projeto*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Descreva seu projeto em detalhes..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Solicitar Orçamento"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BudgetRequestForm
