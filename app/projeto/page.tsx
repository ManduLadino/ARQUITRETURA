import { ProjectForm } from "@/components/project-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-16 md:py-24 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-buscarq-yellow/10 via-transparent to-transparent dark:from-buscarq-yellow/5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-buscarq-blue/10 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-buscarq-yellow/10 rounded-full blur-3xl opacity-30 dark:opacity-20"></div>

        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4 text-center">
              <div className="inline-block rounded-full bg-buscarq-blue/10 px-3 py-1 text-sm text-buscarq-blue dark:bg-buscarq-blue/20 mb-2">
                Solicite seu Orçamento
              </div>
              <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Descreva seu Projeto
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400 max-w-2xl mx-auto">
                Forneça detalhes sobre o seu projeto para receber uma estimativa de preço personalizada
              </p>
            </div>
            <ProjectForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
