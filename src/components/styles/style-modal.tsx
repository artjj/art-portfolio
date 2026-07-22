"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { DanceStyle } from "@/types/content";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface StyleModalProps {
  style: DanceStyle | null;
  onClose: () => void;
}

// Mesmo padrão visual/comportamental do AchievementModal/ResumeModal
// (cartão de superfície, backdrop, foco preso, ESC, fechamento) — devolver
// o foco pro card que abriu é responsabilidade do componente pai (Styles).
export function StyleModal({ style, onClose }: StyleModalProps) {
  const t = useTranslations("Styles");
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useFocusTrap(containerRef, !!style);

  useEffect(() => {
    if (!style) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [style, onClose]);

  const image = style?.modalImage ?? style?.image;
  // Texto completo organizado em parágrafos (linhas em branco no Sanity) —
  // narrativa curta, não uma ficha técnica rígida.
  const paragraphs = style?.trajectory
    ? style.trajectory.split(/\n{2,}/).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {style && (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="style-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
        >
          <m.div
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.96,
              y: reduceMotion ? 0 : 16,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.96,
              y: reduceMotion ? 0 : 16,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
            className={
              image
                ? "border-border bg-surface flex h-[90svh] w-full max-w-4xl flex-col overflow-hidden border md:grid md:h-auto md:max-h-[85vh] md:grid-cols-[280px_1fr]"
                : "border-border bg-surface flex h-[90svh] w-full max-w-2xl flex-col overflow-hidden border md:h-auto md:max-h-[85vh]"
            }
          >
            {image && (
              <div className="relative h-48 w-full shrink-0 md:h-full">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-caption text-fg-muted tracking-wide uppercase">
                    {style.featured
                      ? t("categoryFeatured")
                      : t("categoryComplementary")}
                  </p>
                  <h3
                    id="style-modal-title"
                    className="font-display text-h2 tracking-tight uppercase"
                  >
                    {style.name}
                  </h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={t("close")}
                  className="text-h3 flex h-11 w-11 shrink-0 items-center justify-center"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {paragraphs.length > 0 ? (
                  paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-body text-fg-muted">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-body text-fg-muted">{style.description}</p>
                )}
              </div>

              {(style.mentors || style.currentStatus) && (
                <div className="border-border flex flex-col gap-3 border-t pt-4">
                  {style.mentors && (
                    <div>
                      <p className="text-caption text-fg-muted tracking-wide uppercase">
                        {t("mentorsLabel")}
                      </p>
                      <p className="text-body-sm mt-1">{style.mentors}</p>
                    </div>
                  )}
                  {style.currentStatus && (
                    <div>
                      <p className="text-caption text-fg-muted tracking-wide uppercase">
                        {t("statusLabel")}
                      </p>
                      <p className="text-body-sm mt-1">{style.currentStatus}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
