"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"
import BudgetRequestForm from "./BudgetRequestForm"
import { useAuth } from "../contexts/AuthContext"

const BudgetRequestModal = ({ isOpen, onClose, architect }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [success, setSuccess] = useState(false)

  // Se o modal não estiver aberto, não renderizar nada
  if (!isOpen) return null

  // Se o usuário não estiver autenticado, mostrar tela de redirecionamento para login
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-xl w-full p-6">
          <h2 className="text-2xl font-bold mb-4">Faça login para continuar</h2>
          <p className="text-gray-700 mb-6">Você precisa estar logado como cliente para solicitar um orçamento.</p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={() => navigate("/auth")}>Fazer Login</Button>
          </div>
        </div>
      </div>
    )
  }

  // Se o formulário foi enviado com sucesso
  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-xl w-full p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Solicitação Enviada</h2>
            <p className="text-gray-600 mt-2">
              Seu pedido de orçamento foi enviado com sucesso para {architect.name}. Você receberá uma resposta em
              breve.
            </p>
          </div>
          <div className="flex justify-center space-x-3">
            <Button onClick={() => navigate("/perfil/orcamentos")}>Ver Meus Orçamentos</Button>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Formulário de solicitação de orçamento
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Solicitar Orçamento</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Fechar</span>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Você está solicitando um orçamento de <strong>{architect.name}</strong>. Preencha o formulário abaixo com os
            detalhes do seu projeto.
          </p>
        </div>

        <BudgetRequestForm
          architectId={architect.id}
          architectName={architect.name}
          onSuccess={() => setSuccess(true)}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}

export default BudgetRequestModal
