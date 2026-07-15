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
  const featured = styles.filter((style) => style.featured);
  const complementary = styles.filter((style) => !style.featured);

  return (
    <section id="styles" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-h1 mb-12 tracking-tight uppercase">
            {nav("styles")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((style) => (
            <StyleCard key={style.id} style={style} className="aspect-[4/5]" />
          ))}
        </div>

        {complementary.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {complementary.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                className="aspect-video"
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
