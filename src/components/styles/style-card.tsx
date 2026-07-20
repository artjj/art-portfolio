import { m } from "framer-motion";
import type { DanceStyle } from "@/types/content";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  style: DanceStyle;
  className?: string;
}

// Desktop com hover real vs. touch/mobile — mesmo gate de
// "(hover: hover) and (pointer: fine)" já usado em globals.css (cursor
// customizado) e no hook de autoplay de Trabalhos, para uma definição
// consistente de "desktop" em todo o projeto. As classes do variant
// precisam aparecer por extenso (o scanner do Tailwind não resolve
// interpolação de template string), por isso não há uma constante
// compartilhada com o prefixo.

export function StyleCard({ style, className }: StyleCardProps) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      {/* Placeholder em SVG — next/image bloqueia SVG por padrão. Trocar
          para next/image assim que as fotos reais (JPG/PNG) chegarem. */}
      <div className="relative aspect-video w-full [@media(hover:hover)_and_(pointer:fine)]:aspect-[5/2]">
        <m.img
          src={style.image.url}
          alt={style.image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Overlay + revelação por hover: só existe com ponteiro fino e
            hover real. Em touch o conteúdo já fica visível permanentemente
            no bloco abaixo, sem depender de nenhuma interação. */}
        <div className="absolute inset-0 hidden bg-linear-to-t from-black/85 via-black/20 to-transparent [@media(hover:hover)_and_(pointer:fine)]:block" />

        <div className="absolute inset-x-0 bottom-0 hidden flex-col gap-2 p-6 [@media(hover:hover)_and_(pointer:fine)]:flex">
          <span className="font-display text-h2 tracking-tight text-white uppercase">
            {style.name}
          </span>
          <p className="text-body-sm max-w-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {style.description}
          </p>
        </div>
      </div>

      {/* Layout mobile/touch: título + descrição sempre visíveis abaixo da
          imagem, em vez de sobrepostos — evita depender de hover e mantém
          o texto legível sem precisar escurecer a imagem por cima. */}
      <div className="bg-surface flex flex-col gap-1 p-4 [@media(hover:hover)_and_(pointer:fine)]:hidden">
        <span className="font-display text-h3 tracking-tight uppercase">
          {style.name}
        </span>
        <p className="text-body-sm text-fg-muted">{style.description}</p>
      </div>
    </div>
  );
}
