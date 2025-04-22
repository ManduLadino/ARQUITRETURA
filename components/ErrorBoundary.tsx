"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import * as Sentry from "@sentry/nextjs"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)

    // Report the error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    })
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
            <h2 className="text-xl font-bold text-red-700 mb-2">Algo deu errado</h2>
            <p className="text-red-600 mb-4">
              Ocorreu um erro inesperado. Nossa equipe foi notificada e estamos trabalhando para resolver o problema.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
