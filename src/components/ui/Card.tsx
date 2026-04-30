import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-card p-6 shadow-lg border border-white/5",
          hoverable && "transition-all duration-300 hover:bg-card-hover hover:scale-[1.02] cursor-pointer",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
