"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types/groq"
import { v4 as uuidv4 } from "uuid"
import ImageUploader from "./ImageUploader"
import ChatFeedback from "./ChatFeedback"

export default function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "Olá! Sou o ArqBot, assistente virtual do BUSCARQ. Como posso ajudar você hoje? Posso fornecer informações sobre arquitetura, design de interiores, ou ajudar você a encontrar o arquiteto ideal para o seu projeto.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() && !currentImage) return

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: input,
      image: currentImage || undefined,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          image: currentImage,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha na requisição")
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Limpar a imagem após o envio
      setCurrentImage(null)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)

      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (imageData: string) => {
    setCurrentImage(imageData)
  }

  const handleClearImage = () => {
    setCurrentImage(null)
  }

  const handleFeedback = (messageId: string, isHelpful: boolean, feedback?: string) => {
    // Em uma implementação real, você enviaria isso para o backend
    console.log(`Feedback para mensagem ${messageId}: ${isHelpful ? "Útil" : "Não útil"}`, feedback)

    // Você pode armazenar o feedback em um estado ou enviá-lo para uma API
    // Por enquanto, apenas logamos no console
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg shadow-lg bg-white">
      <div className="p-4 bg-primary text-secondary font-bold rounded-t-lg flex items-center">
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

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : ""}`}>
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === "user" ? "bg-primary text-secondary ml-12" : "bg-gray-100 text-gray-800 mr-12"
              }`}
            >
              {message.image && (
                <div className="mb-2">
                  <img
                    src={message.image || "/placeholder.svg"}
                    alt="Imagem de referência"
                    className="max-w-full rounded-md max-h-48 object-contain"
                  />
                </div>
              )}
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            {message.role === "assistant" && message.id !== messages[0].id && (
              <ChatFeedback messageId={message.id} onFeedback={handleFeedback} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center text-gray-500 mb-4">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        {currentImage && (
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">Imagem selecionada:</p>
            <div className="relative inline-block">
              <img src={currentImage || "/placeholder.svg"} alt="Preview" className="h-16 rounded-md object-cover" />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary text-secondary p-2 rounded-r-lg hover:bg-primary-dark disabled:opacity-50"
              disabled={isLoading || (!input.trim() && !currentImage)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
          <ImageUploader onImageUpload={handleImageUpload} onClear={handleClearImage} />
        </div>
      </form>
    </div>
  )
}
