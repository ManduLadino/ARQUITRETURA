import { type NextRequest, NextResponse } from "next/server"
import { generateGroqResponse } from "@/lib/groq"
import * as Sentry from "@sentry/nextjs"

export async function POST(request: NextRequest) {
  try {
    const { message, image } = await request.json()

    if (!message && !image) {
      return NextResponse.json({ error: "Mensagem ou imagem é necessária" }, { status: 400 })
    }

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

    // Add transaction for performance monitoring
    const transaction = Sentry.startTransaction({
      name: image ? "image_analysis_request" : "text_chat_request",
    })

    try {
      const response = await generateGroqResponse(message, image)
      transaction.finish()
      return NextResponse.json({ response })
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
