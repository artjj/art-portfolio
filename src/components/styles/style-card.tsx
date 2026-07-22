import { m } from "framer-motion";
import type { DanceStyle } from "@/types/content";
import { cn } from "@/lib/utils";

interface StyleCardProps {
  style: DanceStyle;
  openLabel: string;
  onOpen: () => void;
  triggerRef?: (el: HTMLButtonElement | null) => void;
  className?: string;
}

// Desktop com hover real vs. touch/mobile — mesmo gate de
// "(hover: hover) and (pointer: fine)" já usado em globals.css (cursor
// customizado) e no hook de autoplay de Trabalhos, para uma definição
// consistente de "desktop" em todo o projeto. As classes do variant
// precisam aparecer por extenso (o scanner do Tailwind não resolve
// interpolação de template string), por isso não há uma constante
// compartilhada com o prefixo.

export function StyleCard({
  style,
  openLabel,
  onOpen,
  triggerRef,
  className,
}: StyleCardProps) {
  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={onOpen}
      aria-label={openLabel}
      className={cn(
        "group border-border/0 hover:border-accent-text focus-visible:border-accent-text block w-full overflow-hidden border text-left transition-colors duration-200",
        className,
      )}
    >
      {/* Placeholder em SVG — next/image bloqueia SVG por padrão. Trocar
          para next/image assim que as fotos reais (JPG/PNG) chegarem. */}
      <div className="relative aspect-[2/1] w-full [@media(hover:hover)_and_(pointer:fine)]:aspect-[3/1]">
        <m.img
          src={style.image.url}
          alt={style.image.alt}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Overlay só existe com ponteiro fino e hover real. Em touch o
            conteúdo já fica visível permanentemente no bloco abaixo, sem
            depender de nenhuma interação. O texto completo (descrição/
            trajetória) não cabe mais aqui — só título + seta; a narrativa
            completa é sempre pelo clique (modal), nunca pelo hover. */}
        <div className="absolute inset-0 hidden bg-linear-to-t from-black/85 via-black/20 to-transparent [@media(hover:hover)_and_(pointer:fine)]:block" />

        <div className="absolute inset-x-0 bottom-0 hidden flex-col gap-2 p-6 [@media(hover:hover)_and_(pointer:fine)]:flex">
          <span className="font-display text-h3 flex items-center gap-2 tracking-tight text-white uppercase">
            {style.name}
            <ArrowIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </div>
      </div>

      {/* Layout mobile/touch: título + descrição sempre visíveis abaixo da
          imagem, em vez de sobrepostos — evita depender de hover e mantém
          o texto legível sem precisar escurecer a imagem por cima. A seta
          fica sempre visível aqui (não depende de hover). */}
      <div className="bg-surface flex flex-col gap-1 p-4 [@media(hover:hover)_and_(pointer:fine)]:hidden">
        <span className="font-display text-h3 flex items-center gap-2 tracking-tight uppercase">
          {style.name}
          <ArrowIcon className="text-fg-muted h-4 w-4" />
        </span>
        <p className="text-body-sm text-fg-muted">{style.description}</p>
      </div>
    </button>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
