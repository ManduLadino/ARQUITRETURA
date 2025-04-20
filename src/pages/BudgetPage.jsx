"use client"

import { Navigate } from "react-router-dom"
import ProfileSidebar from "../components/ProfileSidebar"
import BudgetList from "../components/BudgetList"
import { useAuth } from "../contexts/AuthContext"

const BudgetPage = () => {
  const { user, isAuthenticated } = useAuth()

  // Redirecionar para a página de login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar userType={user?.userType || "client"} />
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <BudgetList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetPage
