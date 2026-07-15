"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Work } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { WorkCard } from "@/components/works/work-card";
import { WorkModal } from "@/components/works/work-modal";

interface WorksProps {
  works: Work[];
}

export function Works({ works }: WorksProps) {
  const t = useTranslations("Works");
  const nav = useTranslations("Nav");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeWork = activeIndex === null ? null : works[activeIndex];

  return (
    <section id="works" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-h1 mb-12 tracking-tight uppercase">
            {nav("works")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onOpen={() => setActiveIndex(works.indexOf(work))}
              openLabel={t("open", { title: work.title })}
            />
          ))}
        </div>
      </Container>

      <WorkModal
        work={activeWork}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() =>
          setActiveIndex((i) =>
            i !== null && i < works.length - 1 ? i + 1 : i,
          )
        }
        hasPrev={activeIndex !== null && activeIndex > 0}
        hasNext={activeIndex !== null && activeIndex < works.length - 1}
      />
    </section>
  );
}
