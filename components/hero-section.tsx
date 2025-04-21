import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-buscarq-yellow/5 via-transparent to-transparent"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-buscarq-yellow/10 px-3 py-1 text-sm text-buscarq-gray dark:text-buscarq-yellow">
                ✨ Conectando ideias a projetos
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Encontre o arquiteto</span>
                <span className="block mt-2 text-buscarq-yellow">perfeito para você</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                BUSCARQ conecta clientes a arquitetos de forma rápida e intuitiva. Receba uma estimativa de valor para o
                seu projeto em minutos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md transition-all text-base"
                asChild
              >
                <Link href="/projeto">
                  Iniciar Projeto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-buscarq-gray text-buscarq-gray hover:bg-buscarq-gray/5 dark:border-buscarq-yellow dark:text-buscarq-yellow dark:hover:bg-buscarq-yellow/10 text-base"
                asChild
              >
                <Link href="#como-funciona">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl hover-scale">
                <img src="/placeholder.svg?height=500&width=500" alt="BUSCARQ" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-buscarq-yellow rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-buscarq-gray rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
