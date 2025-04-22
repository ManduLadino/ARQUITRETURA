import ChatAssistant from "@/components/ChatAssistant"
import ImageAnalysisExamples from "@/components/ImageAnalysisExamples"

export default function AssistantPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-4">Assistente Virtual BUSCARQ</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Converse com nosso assistente virtual para obter ajuda na busca por arquitetos, informações sobre serviços de
        arquitetura ou tirar dúvidas sobre seu projeto. Agora você também pode enviar imagens de referência para
        análise!
      </p>

      <div className="max-w-md mx-auto">
        <ChatAssistant />
      </div>

      <ImageAnalysisExamples />

      <div className="mt-12 bg-gray-50 p-6 rounded-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Como usar a análise de imagens</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Clique no botão "Enviar imagem de referência" abaixo da caixa de mensagem</li>
          <li>Selecione uma imagem do seu dispositivo (formatos JPG, PNG)</li>
          <li>Adicione uma pergunta específica ou deixe o campo em branco para uma análise geral</li>
          <li>Clique no botão de enviar para receber a análise do ArqBot</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          Dica: Para melhores resultados, envie imagens claras e bem iluminadas. O assistente pode analisar estilos
          arquitetônicos, elementos de design, materiais, cores e sugerir profissionais adequados para projetos
          semelhantes.
        </p>
      </div>
    </div>
  )
}
