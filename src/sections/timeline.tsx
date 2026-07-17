"use client";

import { useTranslations } from "next-intl";
import type { TimelineItem } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const nav = useTranslations("Nav");

  return (
    <section id="timeline" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-h1 mb-16 tracking-tight uppercase">
            {nav("timeline")}
          </h2>

          <ol className="relative flex flex-col gap-10 md:flex-row md:gap-8 md:overflow-x-auto md:pb-4">
            <div className="bg-border absolute top-1.5 bottom-0 left-1.5 w-px md:top-1.5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />

            {items.map((item) => (
              <li
                key={item.id}
                className="relative min-w-0 flex-1 pl-8 md:min-w-52 md:pt-8 md:pl-0"
              >
                <span className="bg-accent absolute top-1 left-0 h-3 w-3 rounded-full md:top-0" />
                <span className="text-body-sm text-accent-text font-medium">
                  {item.year}
                </span>
                <h3 className="font-display text-h3 mt-1 tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="text-body-sm text-fg-muted mt-2">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
