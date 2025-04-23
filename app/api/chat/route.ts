import { type NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"
import { getCachedResponse, cacheResponse } from "@/lib/cache"

export async function POST(request: NextRequest) {
  try {
    const { message, image } = await request.json()

    if (!message && !image) {
      return NextResponse.json({ error: "Mensagem ou imagem é necessária" }, { status: 400 })
    }

    // Create a transaction for performance monitoring
    const transaction = Sentry.startTransaction({
      name: image ? "image_analysis_request" : "text_chat_request",
    })

    try {
      // Check if we have a cached response
      const cachedResponse = getCachedResponse(message, image)

      if (cachedResponse) {
        // Add a tag to the transaction to indicate a cache hit
        transaction.setTag("cache", "hit")
        transaction.finish()

        return NextResponse.json({
          response: cachedResponse,
          meta: {
            fromCache: true,
          },
        })
      }

      // No cache hit, we need to generate a response
      // Verify environment variables are available
      if (!process.env.GROQ_API_KEY && !image) {
        const error = new Error("Missing GROQ_API_KEY environment variable")
        console.error(error)
        Sentry.captureException(error, {
          tags: {
            api: "groq",
            component: "chat-api",
          },
        })
        return NextResponse.json(
          { error: "Erro de configuração no servidor. Por favor, contate o suporte." },
          { status: 500 },
        )
      }

      if (image && !process.env.OPENAI_API_KEY) {
        const error = new Error("Missing OPENAI_API_KEY environment variable")
        console.error(error)
        Sentry.captureException(error, {
          tags: {
            api: "openai",
            component: "chat-api",
            feature: "image-analysis",
          },
        })
        return NextResponse.json(
          { error: "Erro de configuração no servidor para análise de imagens. Por favor, contate o suporte." },
          { status: 500 },
        )
      }

      // Generate response from AI
      let response: string

      if (image) {
        // Call OpenAI for image analysis
        response = await generateImageAnalysis(message, image)
      } else {
        // Call Groq for text generation
        response = await generateTextResponse(message)
      }

      // Cache the response
      cacheResponse(message, response, image)

      // Add a tag to the transaction to indicate a cache miss
      transaction.setTag("cache", "miss")
      transaction.finish()

      return NextResponse.json({
        response,
        meta: {
          fromCache: false,
        },
      })
    } catch (error) {
      transaction.finish()
      throw error
    }
  } catch (error) {
    console.error("Error in chat API route:", error)

    // Capture the exception with Sentry
    Sentry.captureException(error, {
      tags: {
        component: "chat-api",
      },
      extra: {
        route: "/api/chat",
      },
    })

    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

async function generateTextResponse(prompt: string): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY

  if (!groqApiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable")
  }

  // Create a Sentry span for the API call
  const span = Sentry.startSpan({
    name: "groq_api_call",
    op: "http.client",
  })

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: `Você é o ArqBot, o assistente virtual oficial do BUSCARQ, uma plataforma que conecta clientes a arquitetos no Brasil.

# SOBRE O BUSCARQ
- O BUSCARQ é uma plataforma online que conecta clientes que precisam de serviços de arquitetura com arquitetos qualificados.
- Os clientes podem buscar arquitetos por localização, especialidade, avaliações e portfólio.
- Os arquitetos podem criar perfis, exibir seus trabalhos e receber solicitações de orçamento.
- A plataforma facilita todo o processo, desde a busca inicial até a contratação final.

# SUAS CAPACIDADES
- Fornecer informações sobre arquitetura, design de interiores e construção.
- Ajudar usuários a encontrar arquitetos com base em suas necessidades específicas.
- Explicar o processo de contratação de arquitetos e os serviços oferecidos.
- Responder dúvidas sobre a plataforma BUSCARQ e como utilizá-la.
- Oferecer dicas e tendências em design e arquitetura.
- Auxiliar na compreensão de termos técnicos de arquitetura.

# DIRETRIZES DE RESPOSTA
- Seja sempre cordial, profissional e prestativo.
- Use linguagem acessível, evitando jargões técnicos desnecessários.
- Quando mencionar valores, esclareça que são estimativas e podem variar.
- Personalize suas respostas com base no contexto da pergunta.
- Mantenha suas respostas concisas e diretas, mas completas.
- Use sempre português do Brasil.
- Quando não souber uma resposta específica, seja honesto e sugira alternativas.
- Evite dar conselhos legais ou financeiros específicos.

# EXEMPLOS DE PERGUNTAS E RESPOSTAS

Pergunta: Quanto custa contratar um arquiteto?
Resposta: O custo de contratação de um arquiteto no Brasil varia conforme a complexidade do projeto, experiência do profissional e região. Em média, projetos residenciais podem custar entre R$50 e R$150 por m², enquanto projetos comerciais podem variar de R$70 a R$200 por m². No BUSCARQ, você pode solicitar orçamentos gratuitos de vários arquitetos para comparar preços e serviços antes de tomar sua decisão.

Pergunta: Como encontro um arquiteto especializado em design de interiores?
Resposta: Para encontrar um arquiteto especializado em design de interiores no BUSCARQ, você pode usar nosso sistema de busca e filtrar por "Design de Interiores" na seção de especialidades. Recomendo também verificar o portfólio dos profissionais para ver exemplos de trabalhos anteriores e ler as avaliações de outros clientes. Se preferir, posso ajudá-lo a encontrar recomendações específicas com base na sua localização e necessidades do projeto.

Pergunta: Qual a diferença entre arquiteto e designer de interiores?
Resposta: Arquitetos e designers de interiores têm formações e focos diferentes. Arquitetos são profissionais formados em Arquitetura e Urbanismo, habilitados pelo CAU (Conselho de Arquitetura e Urbanismo) para projetar edificações, fazer alterações estruturais e assinar projetos. Já designers de interiores focam na estética, funcionalidade e organização dos espaços internos, sem necessariamente lidar com aspectos estruturais. Muitos arquitetos também oferecem serviços de design de interiores, combinando ambas as especialidades. No BUSCARQ, você encontra profissionais com ambos os perfis.

# TÓPICOS IMPORTANTES
- Projetos residenciais (casas, apartamentos, reformas)
- Projetos comerciais (lojas, escritórios, restaurantes)
- Design de interiores
- Arquitetura sustentável
- Paisagismo
- Processo de orçamento e contratação
- Documentação necessária para projetos
- Tendências em arquitetura e design
- Etapas de um projeto arquitetônico
- Aprovações e licenças para construção

Lembre-se que você representa o BUSCARQ e deve sempre incentivar os usuários a utilizar a plataforma para suas necessidades de arquitetura e design.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    // Re-throw the error to be handled by the parent function
    throw error
  } finally {
    // Finish the span
    span?.finish()
  }
}

async function generateImageAnalysis(prompt: string, image: string): Promise<string> {
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable")
  }

  // Create a Sentry span for the API call
  const span = Sentry.startSpan({
    name: "openai_vision_api_call",
    op: "http.client",
  })

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `Você é o ArqBot, o assistente virtual oficial do BUSCARQ, uma plataforma que conecta clientes a arquitetos no Brasil.

Você está analisando uma imagem de referência arquitetônica ou de design de interiores enviada por um usuário. Sua tarefa é:

1. Identificar o estilo arquitetônico ou de design presente na imagem
2. Descrever os elementos-chave e características notáveis
3. Sugerir como o usuário poderia implementar um estilo semelhante
4. Mencionar quais tipos de arquitetos no BUSCARQ seriam ideais para esse tipo de projeto
5. Estimar custos aproximados para projetos semelhantes no Brasil

Mantenha suas análises profissionais, informativas e úteis. Use sempre português do Brasil e seja específico sobre os elementos arquitetônicos e de design que você identifica.

Ao analisar a imagem, considere:
- Estilo arquitetônico (moderno, contemporâneo, minimalista, industrial, rústico, etc.)
- Paleta de cores e materiais utilizados
- Elementos estruturais e decorativos
- Uso do espaço e funcionalidade
- Iluminação e integração com o ambiente

Lembre-se que você representa o BUSCARQ e deve sempre incentivar os usuários a utilizar a plataforma para suas necessidades de arquitetura e design.`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt || "Analise esta imagem de referência arquitetônica e me dê sua opinião.",
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Vision API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    // Re-throw the error to be handled by the parent function
    throw error
  } finally {
    // Finish the span
    span?.finish()
  }
}
