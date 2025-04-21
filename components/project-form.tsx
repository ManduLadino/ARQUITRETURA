"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Loader2 } from "lucide-react"

export function ProjectForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    location: "",
    area: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate a random price between R$5000 and R$50000
    const estimatedPrice = Math.floor(Math.random() * (50000 - 5000 + 1) + 5000)

    // In a real app, you would send the form data to your backend
    // For now, we'll just redirect to the results page with the estimated price
    router.push(`/projeto/resultado?price=${estimatedPrice}`)
  }

  return (
    <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover-scale">
      <div className="h-2 bg-buscarq-yellow"></div>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(00) 00000-0000"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-base">
                  Tipo de projeto
                </Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => handleSelectChange("projectType", value)}
                >
                  <SelectTrigger
                    id="projectType"
                    className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                  >
                    <SelectValue placeholder="Selecione o tipo de projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residencial</SelectItem>
                    <SelectItem value="commercial">Comercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="renovation">Reforma</SelectItem>
                    <SelectItem value="interior">Design de Interiores</SelectItem>
                    <SelectItem value="landscape">Paisagismo</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">
                Descrição do projeto
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descreva seu projeto com detalhes..."
                required
                className="min-h-[150px] rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base">
                  Localização
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Cidade, Estado"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area" className="text-base">
                  Área aproximada (m²)
                </Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  placeholder="100"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-gray-200 focus:border-buscarq-yellow focus:ring-buscarq-yellow/20"
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-14 text-lg bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md transition-all rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Calculando estimativa...
              </>
            ) : (
              <>
                Obter estimativa de preço
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
