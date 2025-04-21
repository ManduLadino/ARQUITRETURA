"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft, MessageSquare } from "lucide-react"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const price = searchParams.get("price") || "0"

  // Format the price as Brazilian currency
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price))

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-buscarq-yellow/5 via-transparent to-transparent"></div>

        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-full bg-buscarq-yellow/10 px-3 py-1 text-sm text-buscarq-gray dark:text-buscarq-yellow mb-2">
                Orçamento Concluído
              </div>
              <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl text-buscarq-yellow">
                Estimativa de Preço
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed max-w-2xl mx-auto">
                Baseada nos detalhes do seu projeto
              </p>
            </div>

            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover-scale">
              <div className="h-2 bg-buscarq-yellow"></div>
              <CardHeader className="bg-buscarq-yellow p-8">
                <CardTitle className="text-2xl text-buscarq-gray">Resultado da Estimativa</CardTitle>
                <CardDescription className="text-buscarq-gray/80">Valor aproximado para o seu projeto</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="text-6xl font-extrabold text-buscarq-yellow py-4">{formattedPrice}</div>
                  <p className="text-muted-foreground max-w-lg">
                    Esta é uma estimativa inicial baseada nas informações fornecidas. O valor final pode variar de
                    acordo com detalhes específicos do projeto.
                  </p>
                  <div className="grid w-full gap-6 md:grid-cols-2 mt-6">
                    {[
                      "Inclui análise preliminar do projeto",
                      "Consulta inicial com o arquiteto",
                      "Projeto básico com plantas e elevações",
                      "Acompanhamento durante o processo",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                        <CheckCircle2 className="h-5 w-5 text-buscarq-yellow mt-0.5" />
                        <div className="text-left text-sm">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 p-8 pt-0 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-buscarq-gray text-buscarq-gray hover:bg-buscarq-gray/5 dark:border-buscarq-yellow dark:text-buscarq-yellow dark:hover:bg-buscarq-yellow/10"
                >
                  <Link href="/projeto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Link>
                </Button>
                <Button
                  className="w-full bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md sm:w-auto"
                  asChild
                >
                  <Link href="#">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Falar com um arquiteto
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4 text-center bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold">Próximos Passos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Um de nossos arquitetos parceiros entrará em contato em breve para discutir os detalhes do seu projeto.
                Enquanto isso, você pode revisar sua estimativa ou iniciar um novo projeto.
              </p>
              <div className="pt-4">
                <Button
                  className="bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md"
                  asChild
                >
                  <Link href="/dashboard">Acessar Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
