import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-spotify-green text-black hover:bg-[#1ed760]": variant === "primary",
            "bg-white text-black hover:bg-gray-200": variant === "secondary",
            "border border-white/20 bg-transparent hover:bg-white/10 text-white": variant === "outline",
            "hover:bg-white/10 text-white": variant === "ghost",
            "h-9 px-4 text-sm": size === "sm",
            "h-12 px-8 text-base": size === "md",
            "h-14 px-10 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
