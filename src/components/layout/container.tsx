import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  full?: boolean;
}

// Layout híbrido — doc 04 §3: a maioria das seções fica contida,
// mas seções como o Hero usam full=true para sangrar até a borda.
export function Container({
  full = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        !full && "max-w-[90rem]",
        className,
      )}
      {...props}
    />
  );
}
