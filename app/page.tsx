import Link from "next/link"
import Button from "@/components/ui/Button"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
              Encontre o arquiteto ideal para o seu projeto
            </h1>
            <p className="text-xl mb-8 text-secondary-light">
              BUSCARQ conecta você aos melhores profissionais de arquitetura do Brasil. Realize seu sonho com quem
              entende do assunto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/busca">
                <Button size="lg" variant="secondary" className="font-bold">
                  Encontrar Arquiteto
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="font-bold">
                  Sou Arquiteto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
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
              <h3 className="text-xl font-semibold mb-2">Busque</h3>
              <p className="text-gray-600">
                Encontre arquitetos qualificados com base na sua localização e necessidades específicas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
              <p className="text-gray-600">Entre em contato diretamente com os profissionais e discuta seu projeto.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Realize</h3>
              <p className="text-gray-600">Contrate o profissional ideal e transforme suas ideias em realidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Conheça Nosso Assistente Virtual</h2>
              <p className="text-gray-700 mb-4">
                Nosso assistente virtual alimentado por IA está pronto para ajudar você a encontrar o arquiteto perfeito
                para seu projeto.
              </p>
              <p className="text-gray-700 mb-6">
                Tire dúvidas sobre arquitetura, receba recomendações personalizadas e obtenha informações sobre o
                processo de contratação.
              </p>
              <Link href="/assistente">
                <Button size="lg">Conversar com o Assistente</Button>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary text-secondary p-4 rounded-t-lg font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                ArqBot - Assistente BUSCARQ
              </div>
              <div className="p-4 border-x border-b rounded-b-lg">
                <div className="bg-gray-100 p-3 rounded-lg mb-4 max-w-[80%]">
                  Olá! Sou o ArqBot, assistente virtual do BUSCARQ. Como posso ajudar você hoje?
                </div>
                <div className="bg-primary text-secondary p-3 rounded-lg mb-4 ml-auto max-w-[80%]">
                  Preciso de um arquiteto especializado em design de interiores.
                </div>
                <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                  Posso ajudar com isso! Temos vários arquitetos especializados em design de interiores. Você prefere
                  alguém com experiência em residências ou espaços comerciais?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-secondary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para começar seu projeto?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de clientes satisfeitos que encontraram o arquiteto ideal através do BUSCARQ.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="hover:bg-secondary-light">
              Comece Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
