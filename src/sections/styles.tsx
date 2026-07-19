"use client";

import { useTranslations } from "next-intl";
import type { DanceStyle } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { StyleCard } from "@/components/styles/style-card";

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
            <StyleCard key={style.id} style={style} className="aspect-[5/2]" />
          ))}
        </div>

        {complementary.length > 0 && (
          <div className="mt-10">
            <p className="text-body-sm text-fg-muted tracking-wide uppercase">
              {t("complementaryTitle")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {complementary.map((style) => (
                <li
                  key={style.id}
                  className="border-border text-fg-muted text-body-sm rounded-full border px-4 py-2"
                >
                  {style.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
