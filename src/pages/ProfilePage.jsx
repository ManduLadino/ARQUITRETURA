"use client"

import { useState } from "react"
import { Navigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import ProfileSidebar from "../components/ProfileSidebar"
import { useAuth } from "../contexts/AuthContext"

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth()

  // Redirecionar para a página de login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Em uma aplicação real, você enviaria essas alterações para o backend
    // Aqui estamos apenas simulando a atualização do perfil
    console.log("Dados atualizados:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "",
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar userType={user?.userType || "client"} />
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Meu Perfil</CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>Salvar</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Foto de Perfil */}
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        Alterar Foto
                      </Button>
                    )}
                  </div>

                  {/* Informações Pessoais */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-4">Informações Pessoais</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome Completo
                        </label>
                        {isEditing ? (
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        ) : (
                          <p className="py-2">{formData.name || "-"}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        {isEditing ? (
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        ) : (
                          <p className="py-2">{formData.email || "-"}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        {isEditing ? (
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        ) : (
                          <p className="py-2">{formData.phone || "-"}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Endereço
                        </label>
                        {isEditing ? (
                          <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                        ) : (
                          <p className="py-2">{formData.address || "-"}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Biografia
                      </label>
                      {isEditing ? (
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                        />
                      ) : (
                        <p className="py-2">{formData.bio || "-"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seção adicional baseada no tipo de usuário */}
            {user?.userType === "client" && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Meus Projetos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Você ainda não tem projetos cadastrados.</p>
                    <Button>Criar Novo Projeto</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {user?.userType === "architect" && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Meu Portfólio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Adicione projetos ao seu portfólio para destacar seu trabalho.</p>
                    <Button>Adicionar Projeto</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
