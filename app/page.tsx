import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <Features />
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10 bg-buscarq-yellow/5"></div>

          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-6 text-buscarq-yellow">
                Pronto para começar seu projeto?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Conecte-se com arquitetos qualificados e receba uma estimativa de preço instantânea.
              </p>
              <Button
                size="lg"
                className="bg-buscarq-yellow text-buscarq-gray hover:bg-buscarq-yellow/90 hover:shadow-md transition-all text-lg px-8 py-6 h-auto"
                asChild
              >
                <Link href="/projeto">
                  Iniciar Projeto Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
