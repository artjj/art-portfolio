import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 text-body font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg",
  secondary:
    "border border-border bg-transparent text-fg hover:border-accent-text hover:text-accent-text",
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: ButtonVariant;
};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// Componente polimórfico: com `href` renderiza <a>, sem `href` renderiza
// <button> — evita aninhar elementos interativos (ex.: <button> dentro de <a>).
export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    return <a className={classes} {...props} />;
  }

  return <button className={classes} {...props} />;
}
