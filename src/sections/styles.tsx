"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { DanceStyle } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StyleCard } from "@/components/styles/style-card";
import { StyleModal } from "@/components/styles/style-modal";

interface StylesProps {
  styles: DanceStyle[];
}

export function Styles({ styles }: StylesProps) {
  const nav = useTranslations("Nav");
  const t = useTranslations("Styles");
  // Único ponto de decisão principal/complementar — não repetir essa
  // condição em outro lugar do JSX ou de outros componentes.
  const featured = styles.filter((style) => style.featured);
  const complementary = styles.filter((style) => !style.featured);

  // Um único modal reutilizável pra todos os estilos (principais e
  // complementares) — o card só passa o id selecionado.
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());

  const activeStyle = styles.find((style) => style.id === activeId) ?? null;

  function handleClose() {
    const closedId = activeId;
    setActiveId(null);
    if (closedId) triggerRefs.current.get(closedId)?.focus();
  }

  return (
    <section id="styles" className="py-12 md:py-16">
      <Container>
        <Reveal>
          <h2 className="font-display text-h1 tracking-tight uppercase">
            {nav("styles")}
          </h2>
          <p className="text-body-lg text-fg-muted mt-3 mb-8 max-w-2xl">
            {t("intro")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              openLabel={t("openLabel", { name: style.name })}
              onOpen={() => setActiveId(style.id)}
              triggerRef={(el) => {
                triggerRefs.current.set(style.id, el);
              }}
            />
          ))}
        </div>

        {complementary.length > 0 && (
          <div className="mt-10">
            <p className="text-body-sm text-fg-muted tracking-wide uppercase">
              {t("complementaryTitle")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {complementary.map((style) => (
                <li key={style.id}>
                  <button
                    ref={(el) => {
                      triggerRefs.current.set(style.id, el);
                    }}
                    type="button"
                    onClick={() => setActiveId(style.id)}
                    aria-label={t("openLabel", { name: style.name })}
                    className="border-border text-fg-muted hover:border-accent-text hover:text-accent-text focus-visible:border-accent-text focus-visible:text-accent-text text-body-sm flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 transition-colors duration-200"
                  >
                    {style.name}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <StyleModal style={activeStyle} onClose={handleClose} />
    </section>
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
