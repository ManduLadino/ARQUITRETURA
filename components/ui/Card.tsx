import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden", className)}
      {...props}
    />
  )
})

Card.displayName = "Card"

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 border-b border-gray-200", className)} {...props} />
})

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-xl font-semibold text-gray-900", className)} {...props} />
})

CardTitle.displayName = "CardTitle"

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6", className)} {...props} />
})

CardContent.displayName = "CardContent"

export { Card, CardContent, CardHeader, CardTitle }
