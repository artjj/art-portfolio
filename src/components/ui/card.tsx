import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border bg-surface hover:border-accent border p-6 transition-colors duration-200",
        className,
      )}
      {...props}
    />
  );
}
