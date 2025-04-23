import { Link } from "react-router-dom"
import Button from "../components/ui/Button"

const HomePage = () => {
  return (
    <div>
      {/* Hero Section - Minimalista */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-800">
              Arquitetura que <span className="text-primary font-normal">transforma</span> espaços
            </h1>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">
              Conectamos você aos melhores profissionais de arquitetura do Brasil. Realize seu sonho com quem entende do
              assunto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/busca">
                <Button size="lg" variant="primary" className="min-w-[160px]">
                  Encontrar Arquiteto
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="min-w-[160px]">
                  Sou Arquiteto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimalista */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-light text-center mb-16 text-gray-800">Como funciona</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Busque</h3>
              <p className="text-gray-600">
                Encontre arquitetos qualificados com base na sua localização e necessidades específicas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Conecte-se</h3>
              <p className="text-gray-600">Entre em contato diretamente com os profissionais e discuta seu projeto.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Realize</h3>
              <p className="text-gray-600">Contrate o profissional ideal e transforme suas ideias em realidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview - Minimalista */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-light text-center mb-16 text-gray-800">Projetos em destaque</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="overflow-hidden mb-4">
                  <img
                    src={`/placeholder.svg?height=300&width=400&text=Projeto ${item}`}
                    alt={`Projeto ${item}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1 text-gray-800">Projeto Residencial {item}</h3>
                <p className="text-gray-600 text-sm mb-2">Design de Interiores</p>
                <Link to={`/projeto/${item}`} className="text-primary text-sm font-medium hover:underline">
                  Ver detalhes
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button variant="outline">Ver todos os projetos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalista */}
      <section className="py-16 bg-background">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-light mb-6 text-gray-800">Pronto para começar seu projeto?</h2>
            <p className="text-lg mb-8 text-gray-600">
              Junte-se a milhares de clientes satisfeitos que encontraram o arquiteto ideal através do BUSCARQ.
            </p>
            <Link to="/auth">
              <Button size="lg">Comece Agora</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
