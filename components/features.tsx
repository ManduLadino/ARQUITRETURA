import { CheckCircle2 } from "lucide-react"

export function Features() {
  return (
    <section id="recursos" className="w-full py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-full bg-buscarq-yellow/10 px-3 py-1 text-sm text-buscarq-gray dark:text-buscarq-yellow mb-4">
            Vantagens Exclusivas
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-buscarq-yellow">
            Recursos do BUSCARQ
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubra como o BUSCARQ pode facilitar seu projeto de arquitetura
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid gap-6">
              {[
                {
                  title: "Descrição livre do projeto",
                  description: "Descreva seu projeto com suas próprias palavras, sem limitações de formato",
                },
                {
                  title: "Informar localização",
                  description: "Indique onde o projeto será realizado para encontrar profissionais próximos",
                },
                {
                  title: "Estimativa de preço automática",
                  description:
                    "Receba uma estimativa de valor inicial para o seu projeto com base na localização e descrição",
                },
                {
                  title: "Interface moderna e responsiva",
                  description: "Navegue por uma interface intuitiva e adaptada para todos os dispositivos",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors hover-scale"
                >
                  <div className="flex-shrink-0 mt-1 rounded-full p-1.5 bg-buscarq-yellow text-buscarq-gray">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl hover-scale">
                <img
                  src="/placeholder.svg?height=350&width=500"
                  alt="BUSCARQ Features"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-buscarq-gray/40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-xl font-bold">Interface Intuitiva</h3>
                  <p className="text-white/80 text-sm">Projetada para facilitar sua experiência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
