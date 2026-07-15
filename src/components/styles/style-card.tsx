import { motion } from "framer-motion";
import type { DanceStyle } from "@/types/content";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  style: DanceStyle;
  className?: string;
}

export function StyleCard({ style, className }: StyleCardProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      {/* Placeholder em SVG — next/image bloqueia SVG por padrão. Trocar
          para next/image assim que as fotos reais (JPG/PNG) chegarem. */}
      <motion.img
        src={style.image.url}
        alt={style.image.alt}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <span className="font-display text-h2 tracking-tight text-white uppercase">
          {style.name}
        </span>
        <p className="text-body-sm max-w-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {style.description}
        </p>
      </div>
    </div>
  );
}
