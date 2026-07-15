import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 text-body font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "border border-border bg-transparent text-fg hover:border-accent hover:text-accent",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
