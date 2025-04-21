export default function ImageAnalysisExamples() {
  const examples = [
    {
      id: 1,
      title: "Design de Interiores Moderno",
      image: "/examples/interior-modern.jpg",
      description: "Análise de espaços internos com estilo moderno e minimalista.",
    },
    {
      id: 2,
      title: "Arquitetura Residencial",
      image: "/examples/house-exterior.jpg",
      description: "Avaliação de fachadas e estruturas externas de residências.",
    },
    {
      id: 3,
      title: "Espaços Comerciais",
      image: "/examples/commercial-space.jpg",
      description: "Análise de layouts e design para ambientes comerciais.",
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">O que o ArqBot pode analisar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {examples.map((example) => (
          <div
            key={example.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <img
                src={example.image || "/placeholder.svg"}
                alt={example.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback para placeholder se a imagem não carregar
                  e.currentTarget.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(example.title)}`
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{example.title}</h3>
              <p className="text-gray-600 text-sm">{example.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
