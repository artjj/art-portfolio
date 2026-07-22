"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import type { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/button";
import { ResumeModal } from "@/components/ui/resume-modal";
import { resumeUrl } from "@/lib/site";

interface HeroProps {
  content: HeroContent;
}

// Mesmo breakpoint `md` usado em todo o layout (não é sobre hover/toque
// como no autoplay de Trabalhos — aqui é sobre espaço de tela disponível
// pro visualizador de PDF não ficar apertado).
const MOBILE_QUERY = "(max-width: 767px)";

export function Hero({ content }: HeroProps) {
  const t = useTranslations("Hero");
  const nav = useTranslations("Nav");
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeTriggerRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(
    null,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function handleResumeClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // No mobile deixa o comportamento nativo do link acontecer (nova guia)
    // — evita espremer o visualizador de PDF num modal em tela pequena.
    if (isMobile) return;
    event.preventDefault();
    setResumeOpen(true);
  }

  function handleResumeClose() {
    setResumeOpen(false);
    resumeTriggerRef.current?.focus();
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-[100svh] w-full items-end overflow-hidden text-[var(--hero-fg)]"
    >
      <m.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: parallaxY }}
      >
        {content.video.url ? (
          <video
            className="h-full w-full object-cover"
            src={content.video.url}
            poster={content.video.poster.url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={content.video.poster.url}
            alt={content.video.poster.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </m.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-[var(--hero-overlay-from)] to-[var(--hero-overlay-to)]"
      />

      <div className="relative z-10 flex w-full flex-col gap-8 px-6 pb-20 md:px-10 md:pb-28">
        <div className="hero-enter-1 flex max-w-3xl flex-col gap-4">
          <h1 className="font-display text-display-xl leading-none tracking-tight uppercase">
            {content.headline}
          </h1>
          <p className="text-body-lg text-white/85">{content.tagline}</p>
        </div>

        <div className="hero-enter-2 flex flex-wrap items-center gap-4">
          <Button href="#works" variant="primary">
            {t("worksCta")}
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            className="border-white/60 text-white hover:border-white hover:text-white"
          >
            {nav("contact")}
          </Button>
          <Button
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            triggerRef={(el) => {
              resumeTriggerRef.current = el;
            }}
            onClick={handleResumeClick}
            className="border-white/60 text-white hover:border-white hover:text-white"
          >
            {t("resumeCta")}
          </Button>
        </div>
      </div>

      <ResumeModal open={resumeOpen} onClose={handleResumeClose} />

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <m.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-6 rounded-full border border-white/60 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-white/80" />
        </m.div>
        <span className="sr-only">{t("scrollHint")}</span>
      </div>
    </section>
  );
}
