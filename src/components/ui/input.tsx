import * as React from "react"

import { cn } from '../../lib';


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-3xl border border-input bg-background px-3 py-2 text-base ring-offset-background " +
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground " +
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 transition duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
