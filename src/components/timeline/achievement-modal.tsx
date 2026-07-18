"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Achievement } from "@/types/content";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { AwardIcon } from "./award-icon";

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

// Mesmo padrão visual/comportamental do WorkModal e do
// ChoreographyGalleryModal (backdrop, foco preso, ESC, fechamento) —
// diferença é devolver o foco pro botão-medalha que abriu (feito pelo
// componente pai, AchievementsPanel, via onClose).
export function AchievementModal({
  achievement,
  onClose,
}: AchievementModalProps) {
  const t = useTranslations("Timeline");
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useFocusTrap(containerRef, !!achievement);

  useEffect(() => {
    if (!achievement) return;

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
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={achievement.competition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
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
            className="border-border bg-surface flex w-full max-w-sm flex-col gap-4 border p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <AwardIcon type={achievement.awardType} className="text-3xl" />
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

            {achievement.image && (
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={achievement.image.url}
                  alt={achievement.image.alt}
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="font-display text-h3 tracking-tight uppercase">
                {achievement.competition}
              </h3>
              <p className="text-body text-fg-muted mt-1">
                {[
                  achievement.placement,
                  achievement.category,
                  String(achievement.year),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>

            {achievement.externalUrl && (
              <a
                href={achievement.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text text-body-sm underline underline-offset-4"
              >
                {t("viewReference")}
              </a>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
