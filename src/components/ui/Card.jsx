import { forwardRef } from "react"
import { cn } from "../../utils/cn"

const Card = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden", className)}
      {...props}
    />
  )
})

Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 border-b border-gray-200", className)} {...props} />
})

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-xl font-semibold text-gray-900", className)} {...props} />
})

CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-gray-500 mt-1", className)} {...props} />
})

CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6", className)} {...props} />
})

CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 border-t border-gray-200 bg-gray-50", className)} {...props} />
})

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
