import { type NextRequest, NextResponse } from "next/server"
import { generateGroqResponse } from "@/lib/groq"

export async function POST(request: NextRequest) {
  try {
    const { message, image } = await request.json()

    if (!message && !image) {
      return NextResponse.json({ error: "Mensagem ou imagem é necessária" }, { status: 400 })
    }

    // Verify environment variables are available
    if (!process.env.GROQ_API_KEY && !image) {
      console.error("Missing GROQ_API_KEY environment variable")
      return NextResponse.json(
        { error: "Erro de configuração no servidor. Por favor, contate o suporte." },
        { status: 500 },
      )
    }

    if (image && !process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY environment variable")
      return NextResponse.json(
        { error: "Erro de configuração no servidor para análise de imagens. Por favor, contate o suporte." },
        { status: 500 },
      )
    }

    const response = await generateGroqResponse(message, image)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}
