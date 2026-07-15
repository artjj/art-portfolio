"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import type { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/button";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const t = useTranslations("Hero");
  const nav = useTranslations("Nav");
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

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
      <motion.div
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
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-[var(--hero-overlay-from)] to-[var(--hero-overlay-to)]"
      />

      <div className="relative z-10 flex w-full flex-col gap-8 px-6 pb-20 md:px-10 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex max-w-3xl flex-col gap-4"
        >
          <h1 className="font-display text-display-xl leading-none tracking-tight uppercase">
            {content.headline}
          </h1>
          <p className="text-body-lg text-white/85">{content.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button href="#works" variant="primary">
            {t("watchReel")}
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            className="border-white/60 text-white hover:border-white hover:text-white"
          >
            {nav("contact")}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-6 rounded-full border border-white/60 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
        <span className="sr-only">{t("scrollHint")}</span>
      </div>
    </section>
  );
}
