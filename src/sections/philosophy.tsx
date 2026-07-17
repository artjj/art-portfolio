"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { PhilosophyContent } from "@/types/content";
import { Container } from "@/components/layout/container";

interface PhilosophyProps {
  content: PhilosophyContent;
}

export function Philosophy({ content }: PhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} id="philosophy" className="py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
          {/* Placeholder em SVG — next/image bloqueia SVG por padrão. Trocar
              para next/image assim que a foto real (JPG/PNG) chegar. */}
          <m.img
            src={content.image.url}
            alt={content.image.alt}
            className="absolute inset-0 h-[120%] w-full object-cover"
            style={reduceMotion ? undefined : { y: parallaxY }}
          />
        </div>

        <div className="md:order-1">
          <blockquote className="font-display text-display-l leading-none tracking-tight uppercase">
            {content.quote}
          </blockquote>
          <p className="text-body-lg text-fg-muted mt-6 max-w-md">
            {content.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
