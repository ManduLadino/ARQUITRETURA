"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void
  onClear: () => void
}

export default function ImageUploader({ onImageUpload, onClear }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPreview(base64String)
      onImageUpload(base64String)
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleClear = () => {
    setPreview(null)
    onClear()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {!preview ? (
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <Upload className="h-4 w-4" />
          {isLoading ? "Carregando..." : "Enviar imagem de referência"}
        </Button>
      ) : (
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-gray-200">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-contain" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
