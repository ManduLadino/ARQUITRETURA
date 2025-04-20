import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card"
import Button from "../components/ui/Button"

const HomePage = () => {
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
              <Link to="/busca">
                <Button size="lg" variant="secondary" className="font-bold">
                  Encontrar Arquiteto
                </Button>
              </Link>
              <Link to="/auth">
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

      {/* Featured Architects */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Arquitetos em Destaque</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={`/placeholder.svg?height=200&width=400&text=Arquiteto ${item}`}
                  alt={`Arquiteto ${item}`}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">Arquiteto {item}</h3>
                  <p className="text-gray-600 mb-4">
                    Especialista em design de interiores com mais de 10 anos de experiência.
                  </p>
                  <Link to={`/arquiteto/arq${item}`}>
                    <Button variant="outline" className="w-full">
                      Ver Perfil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/busca">
              <Button size="lg">Ver Todos os Arquitetos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">O que Nossos Clientes Dizem</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <Card key={item} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Cliente {item}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "O BUSCARQ me ajudou a encontrar o arquiteto perfeito para o meu projeto. O processo foi simples e
                    rápido, e estou extremamente satisfeito com o resultado final."
                  </p>
                </CardContent>
              </Card>
            ))}
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
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="hover:bg-secondary-light">
              Comece Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
