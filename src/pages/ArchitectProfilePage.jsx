"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import Button from "../components/ui/Button"
import ProjectGallery from "../components/ProjectGallery"
import ReviewList from "../components/ReviewList"
import BudgetRequestModal from "../components/BudgetRequestModal"

// Dados simulados para o perfil do arquiteto
const mockArchitect = {
  id: "arq123",
  name: "Ana Oliveira",
  title: "Arquiteta e Urbanista",
  profileImage: "/placeholder.svg?height=200&width=200&text=Ana",
  coverImage: "/placeholder.svg?height=400&width=1200&text=Capa",
  bio: "Arquiteta com mais de 10 anos de experiência em projetos residenciais e comerciais. Especialista em design de interiores e sustentabilidade.",
  location: "São Paulo, SP",
  rating: 4.8,
  reviewCount: 32,
  contactEmail: "ana.oliveira@exemplo.com",
  contactPhone: "(11) 98765-4321",
  website: "www.anaoliveira.arq.br",
  specialties: ["Design de Interiores", "Arquitetura Sustentável", "Projetos Residenciais", "Reformas"],
  education: [
    {
      institution: "Universidade de São Paulo (USP)",
      degree: "Mestrado em Arquitetura Sustentável",
      year: "2015",
    },
    {
      institution: "Universidade Mackenzie",
      degree: "Bacharelado em Arquitetura e Urbanismo",
      year: "2010",
    },
  ],
  experience: [
    {
      company: "Studio Arquitetura",
      role: "Arquiteta Sênior",
      period: "2018 - Presente",
    },
    {
      company: "ABC Projetos",
      role: "Arquiteta Júnior",
      period: "2010 - 2018",
    },
  ],
  projects: [
    {
      id: "p1",
      title: "Residência Vila Nova",
      description: "Projeto residencial com foco em sustentabilidade e aproveitamento de luz natural.",
      type: "Residencial",
      year: "2022",
      images: [
        "/placeholder.svg?height=400&width=600&text=Projeto 1",
        "/placeholder.svg?height=400&width=600&text=Projeto 1.2",
        "/placeholder.svg?height=400&width=600&text=Projeto 1.3",
      ],
    },
    {
      id: "p2",
      title: "Escritório Moderno",
      description: "Design de interiores para escritório corporativo com espaços colaborativos.",
      type: "Comercial",
      year: "2021",
      images: [
        "/placeholder.svg?height=400&width=600&text=Projeto 2",
        "/placeholder.svg?height=400&width=600&text=Projeto 2.2",
      ],
    },
    {
      id: "p3",
      title: "Café Aconchego",
      description: "Projeto completo para cafeteria com ambiente acolhedor e funcional.",
      type: "Comercial",
      year: "2020",
      images: ["/placeholder.svg?height=400&width=600&text=Projeto 3"],
    },
  ],
  reviews: [
    {
      id: "r1",
      clientName: "Carlos Silva",
      rating: 5,
      date: "15/03/2023",
      comment:
        "Excelente profissional! A Ana entendeu perfeitamente o que queríamos e transformou nossa casa em um lar dos sonhos.",
      projectTitle: "Reforma Residencial",
    },
    {
      id: "r2",
      clientName: "Mariana Costa",
      rating: 5,
      date: "22/01/2023",
      comment:
        "Muito atenciosa e criativa. O projeto do meu escritório ficou incrível e funcional, exatamente como eu precisava.",
      projectTitle: "Design de Escritório",
    },
    {
      id: "r3",
      clientName: "Pedro Mendes",
      rating: 4,
      date: "05/11/2022",
      comment:
        "Ótimo trabalho no projeto da nossa loja. O único ponto foi um pequeno atraso na entrega, mas o resultado compensou.",
      projectTitle: "Projeto Comercial",
    },
  ],
}

const ArchitectProfilePage = () => {
  const { id } = useParams()
  // Em uma aplicação real, você buscaria os dados do arquiteto com base no ID
  const architect = mockArchitect

  const [activeTab, setActiveTab] = useState("portfolio")
  const [showBudgetModal, setShowBudgetModal] = useState(false)

  // Função para renderizar as estrelas de avaliação
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-gray-700">
          {rating} ({architect.reviewCount} avaliações)
        </span>
      </div>
    )
  }

  const openBudgetModal = () => {
    setShowBudgetModal(true)
  }

  const closeBudgetModal = () => {
    setShowBudgetModal(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Modal de solicitação de orçamento */}
      <BudgetRequestModal isOpen={showBudgetModal} onClose={closeBudgetModal} architect={architect} />

      {/* Imagem de Capa */}
      <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${architect.coverImage})` }}>
        <div className="container h-full flex items-end">
          <div className="bg-white/80 backdrop-blur-sm p-4 mb-4 rounded-lg">
            <Link to="/busca" className="text-primary-600 hover:text-primary-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para a busca
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Informações Principais */}
        <div className="flex flex-col md:flex-row -mt-16 mb-8">
          <div className="md:w-1/3 flex justify-center md:justify-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={architect.profileImage || "/placeholder.svg"}
                alt={architect.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3 mt-4 md:mt-16 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{architect.name}</h1>
            <p className="text-xl text-gray-600 mb-2">{architect.title}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              {architect.specialties.map((specialty, index) => (
                <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {specialty}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-4">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{architect.location}</span>
              </div>
              <div>{renderStars(architect.rating)}</div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Button onClick={openBudgetModal}>Solicitar Orçamento</Button>
              <Button>Entrar em Contato</Button>
              <Button variant="outline">Salvar</Button>
            </div>
          </div>
        </div>

        {/* Navegação por Abas */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "portfolio"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Portfólio
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "about"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Avaliações
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "contact"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Contato
            </button>
          </nav>
        </div>

        {/* Conteúdo das Abas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {activeTab === "portfolio" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Portfólio de Projetos</h2>
                <ProjectGallery projects={architect.projects} />
              </div>
            )}

            {activeTab === "about" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Sobre {architect.name}</h2>
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Biografia</h3>
                    <p className="text-gray-700 whitespace-pre-line">{architect.bio}</p>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Formação Acadêmica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {architect.education.map((edu, index) => (
                        <li key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <p className="font-semibold">{edu.degree}</p>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experiência Profissional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {architect.experience.map((exp, index) => (
                        <li key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <p className="font-semibold">{exp.role}</p>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.period}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Avaliações de Clientes</h2>
                <ReviewList reviews={architect.reviews} />
              </div>
            )}

            {activeTab === "contact" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary-600 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">Email</p>
                          <a href={`mailto:${architect.contactEmail}`} className="text-primary-600 hover:underline">
                            {architect.contactEmail}
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-primary-600 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">Telefone</p>
                          <a href={`tel:${architect.contactPhone}`} className="text-primary-600 hover:underline">
                            {architect.contactPhone}
                          </a>
                        </div>
                      </li>
                      {architect.website && (
                        <li className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-primary-600 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                          <div>
                            <p className="font-semibold">Website</p>
                            <a
                              href={`https://${architect.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:underline"
                            >
                              {architect.website}
                            </a>
                          </div>
                        </li>
                      )}
                    </ul>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4">Enviar Mensagem</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Mensagem
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-2 px-3 border"
                          ></textarea>
                        </div>
                        <Button type="submit" className="w-full">
                          Enviar Mensagem
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Informações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      <strong>Experiência:</strong> {architect.experience[0].period}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    <span className="text-gray-700">
                      <strong>Formação:</strong> {architect.education[0].institution}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      <strong>Registro:</strong> CAU A123456-7
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      <strong>Projetos:</strong> {architect.projects.length} concluídos
                    </span>
                  </li>
                </ul>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Especialidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {architect.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full" onClick={openBudgetModal}>
                    Solicitar Orçamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectProfilePage
