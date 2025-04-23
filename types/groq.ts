export interface GroqMessage {
  role: string
  content:
    | string
    | Array<{
        type: "text" | "image_url"
        text?: string
        image_url?: {
          url: string
        }
      }>
}

export interface GroqChoice {
  index: number
  message: GroqMessage
  finish_reason: string
}

export interface GroqResponse {
  id: string
  object: string
  created: number
  model: string
  choices: GroqChoice[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  image?: string
  timestamp: Date
  fromCache?: boolean // Indicates if the response came from cache
}

export interface FeedbackData {
  messageId: string
  isHelpful: boolean
  feedback?: string
  timestamp: Date
}
