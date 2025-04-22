"use client"

import { useState } from "react"

interface ChatFeedbackProps {
  messageId: string
  onFeedback: (messageId: string, isHelpful: boolean, feedback?: string) => void
}

export default function ChatFeedback({ messageId, onFeedback }: ChatFeedbackProps) {
  const [feedbackGiven, setFeedbackGiven] = useState<"positive" | "negative" | null>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")

  const handleFeedback = (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful ? "positive" : "negative")

    if (!isHelpful) {
      setShowFeedbackForm(true)
    } else {
      onFeedback(messageId, true)
    }
  }

  const submitFeedback = () => {
    onFeedback(messageId, false, feedbackText)
    setShowFeedbackForm(false)
  }

  if (feedbackGiven && !showFeedbackForm) {
    return (
      <div className="text-xs text-gray-500 mt-1">
        {feedbackGiven === "positive" ? "Obrigado pelo feedback!" : "Obrigado pelo feedback!"}
      </div>
    )
  }

  return (
    <div className="mt-1">
      {!feedbackGiven ? (
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>Esta resposta foi útil?</span>
          <button
            onClick={() => handleFeedback(true)}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Resposta útil"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Resposta não útil"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
            </svg>
          </button>
        </div>
      ) : showFeedbackForm ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Como podemos melhorar esta resposta?"
            className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            rows={2}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              onClick={submitFeedback}
              className="px-3 py-1 text-xs bg-primary text-secondary hover:bg-primary-dark rounded-md"
              disabled={!feedbackText.trim()}
            >
              Enviar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
