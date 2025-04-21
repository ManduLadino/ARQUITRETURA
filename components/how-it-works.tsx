import { ClipboardList, MapPin, Calculator, Users } from "lucide-react"

export function HowItWorks() {
  return (
    <section id="como-funciona" className="w-full py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-buscarq-gray/5 via-transparent to-transparent"></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-full bg-buscarq-yellow/10 px-3 py-1 text-sm text-buscarq-gray dark:text-buscarq-yellow mb-4">
            Processo Simplificado
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-buscarq-yellow">
            Como Funciona
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Conecte-se com arquitetos qualificados em apenas alguns passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ClipboardList,
              title: "Descreva seu projeto",
              description: "Forneça detalhes sobre o que você precisa para seu projeto de arquitetura",
            },
            {
              icon: MapPin,
              title: "Informe a localização",
              description: "Indique onde o projeto será realizado para encontrar profissionais próximos",
            },
            {
              icon: Calculator,
              title: "Receba estimativa",
              description: "Obtenha uma estimativa de preço automática baseada nos detalhes fornecidos",
            },
            {
              icon: Users,
              title: "Conecte-se",
              description: "Entre em contato com arquitetos qualificados e inicie seu projeto",
            },
          ].map((item, index) => (
            <div key={index} className="relative group hover-scale">
              <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-buscarq-yellow text-buscarq-gray">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                <div className="absolute top-4 left-4 text-4xl font-bold opacity-10">{index + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
