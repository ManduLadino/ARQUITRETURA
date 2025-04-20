"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

// Dados simulados de arquitetos
const mockArchitects = [
  {
    id: "arq123",
    name: "Ana Oliveira",
    title: "Arquiteta e Urbanista",
    profileImage: "/placeholder.svg?height=200&width=200&text=Ana",
    location: "São Paulo, SP",
    rating: 4.8,
    reviewCount: 32,
    specialties: ["Design de Interiores", "Arquitetura Sustentável", "Projetos Residenciais"],
    projectCount: 24,
    featured: true,
  },
  {
    id: "arq456",
    name: "Carlos Santos",
    title: "Arquiteto",
    profileImage: "/placeholder.svg?height=200&width=200&text=Carlos",
    location: "Rio de Janeiro, RJ",
    rating: 4.6,
    reviewCount: 28,
    specialties: ["Projetos Comerciais", "Reformas", "Design Moderno"],
    projectCount: 18,
    featured: true,
  },
  {
    id: "arq789",
    name: "Mariana Costa",
    title: "Arquiteta e Designer",
    profileImage: "/placeholder.svg?height=200&width=200&text=Mariana",
    location: "Belo Horizonte, MG",
    rating: 4.9,
    reviewCount: 45,
    specialties: ["Design de Interiores", "Paisagismo", "Projetos Residenciais"],
    projectCount: 30,
    featured: true,
  },
  {
    id: "arq101",
    name: "Pedro Almeida",
    title: "Arquiteto e Urbanista",
    profileImage: "/placeholder.svg?height=200&width=200&text=Pedro",
    location: "Curitiba, PR",
    rating: 4.7,
    reviewCount: 22,
    specialties: ["Urbanismo", "Projetos Sustentáveis", "Consultoria"],
    projectCount: 15,
  },
  {
    id: "arq202",
    name: "Juliana Lima",
    title: "Arquiteta",
    profileImage: "/placeholder.svg?height=200&width=200&text=Juliana",
    location: "Brasília, DF",
    rating: 4.5,
    reviewCount: 19,
    specialties: ["Projetos Residenciais", "Reformas", "Design Minimalista"],
    projectCount: 12,
  },
  {
    id: "arq303",
    name: "Rafael Mendes",
    title: "Arquiteto e Consultor",
    profileImage: "/placeholder.svg?height=200&width=200&text=Rafael",
    location: "Salvador, BA",
    rating: 4.4,
    reviewCount: 16,
    specialties: ["Consultoria", "Projetos Comerciais", "Reformas"],
    projectCount: 10,
  },
]

// Opções de filtro
const locationOptions = [
  "Todas",
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Brasília, DF",
  "Salvador, BA",
]
const specialtyOptions = [
  "Todas",
  "Design de Interiores",
  "Arquitetura Sustentável",
  "Projetos Residenciais",
  "Projetos Comerciais",
  "Reformas",
  "Paisagismo",
  "Urbanismo",
  "Consultoria",
]

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("Todas")
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas")
  const [sortBy, setSortBy] = useState("rating")

  // Filtrar arquitetos com base nos critérios
  const filteredArchitects = mockArchitects.filter((architect) => {
    // Filtro de pesquisa por nome
    const matchesSearch = architect.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de localização
    const matchesLocation = locationFilter === "Todas" || architect.location === locationFilter

    // Filtro de especialidade
    const matchesSpecialty = specialtyFilter === "Todas" || architect.specialties.includes(specialtyFilter)

    return matchesSearch && matchesLocation && matchesSpecialty
  })

  // Ordenar arquitetos
  const sortedArchitects = [...filteredArchitects].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "reviews") {
      return b.reviewCount - a.reviewCount
    } else if (sortBy === "projects") {
      return b.projectCount - a.projectCount
    }
    return 0
  })

  // Renderizar estrelas de avaliação
  const renderStars = (rating, architect) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">
          {rating} ({architect.reviewCount})
        </span>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container">
        {/* Hero Section */}
        <div className="bg-primary rounded-xl p-8 mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Encontre o Arquiteto Ideal para o Seu Projeto
            </h1>
            <p className="text-secondary-light text-lg mb-6">
              Busque entre os melhores profissionais de arquitetura do Brasil e encontre o parceiro perfeito para
              transformar suas ideias em realidade.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 w-full bg-white"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <select
                id="location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
              >
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Especialidade
              </label>
              <select
                id="specialty"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
              >
                {specialtyOptions.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
              >
                <option value="rating">Melhor Avaliação</option>
                <option value="reviews">Mais Avaliações</option>
                <option value="projects">Mais Projetos</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">{filteredArchitects.length} Arquitetos Encontrados</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArchitects.map((architect) => (
              <Card key={architect.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={architect.profileImage || "/placeholder.svg"}
                    alt={architect.name}
                    className="w-full h-48 object-cover"
                  />
                  {architect.featured && (
                    <span className="absolute top-2 right-2 bg-primary text-secondary text-xs font-bold px-2 py-1 rounded">
                      Destaque
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{architect.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{architect.title}</p>

                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500 mr-1"
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
                    <span className="text-gray-600 text-sm">{architect.location}</span>
                  </div>

                  <div className="mb-3">{renderStars(architect.rating, architect)}</div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {architect.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {specialty}
                      </span>
                    ))}
                    {architect.specialties.length > 2 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{architect.specialties.length - 2}
                      </span>
                    )}
                  </div>

                  <Link to={`/arquiteto/${architect.id}`}>
                    <Button variant="primary" className="w-full">
                      Ver Perfil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Se você é um arquiteto, junte-se à nossa plataforma e conecte-se com clientes em potencial.
          </p>
          <Button variant="secondary" size="lg">
            Cadastre-se como Arquiteto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
