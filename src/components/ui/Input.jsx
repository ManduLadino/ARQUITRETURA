import { forwardRef } from "react"
import { cn } from "../../utils/cn"

const Input = forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "block w-full rounded-md border-gray-300 shadow-sm",
        "focus:border-primary-500 focus:ring-primary-500 sm:text-sm",
        "py-2 px-3 border",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
