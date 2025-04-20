"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardFooter } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { useAuth } from "../contexts/AuthContext"

const AuthPage = () => {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client", // client or architect
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login API call
    setTimeout(() => {
      console.log("Login data:", loginData)
      // Criar um usuário simulado para login
      const userData = {
        id: "1",
        name: "Usuário Exemplo",
        email: loginData.email,
        userType: "client", // Default é cliente
        profileImage: null,
      }

      login(userData)
      setIsLoading(false)
      // Redirecionar para a página de perfil
      navigate("/perfil")
    }, 1500)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate password match
    if (registerData.password !== registerData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    // Simulate register API call
    setTimeout(() => {
      console.log("Register data:", registerData)

      // Criar um usuário simulado com base nos dados de registro
      const userData = {
        id: "2",
        name: registerData.name,
        email: registerData.email,
        userType: registerData.userType,
        profileImage: null,
      }

      register(userData)
      setIsLoading(false)
      // Redirecionar para a página de perfil
      navigate("/perfil")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600">BUSCARQ</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">{isLogin ? "Entre na sua conta" : "Crie sua conta"}</h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Acesse sua conta para continuar" : "Registre-se para começar a usar o BUSCARQ"}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">{error}</div>}

            {isLogin ? (
              // Login Form
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Senha
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Lembrar-me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                        Esqueceu a senha?
                      </a>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
            ) : (
              // Register Form
              <form onSubmit={handleRegisterSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Senha
                    </label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Senha
                    </label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Você é:</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="client"
                          checked={registerData.userType === "client"}
                          onChange={handleRegisterChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Cliente</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="architect"
                          checked={registerData.userType === "architect"}
                          onChange={handleRegisterChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Arquiteto</span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center p-6 bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {isLogin ? "Registre-se" : "Entre"}
              </button>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-500">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
