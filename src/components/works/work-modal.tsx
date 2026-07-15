"use client";

import { useEffect, useRef, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Work } from "@/types/content";

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const SWIPE_THRESHOLD = 50;

export function WorkModal({
  work,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: WorkModalProps) {
  const t = useTranslations("Works");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!work) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev) onPrev();
      if (event.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [work, onClose, onPrev, onNext, hasPrev, hasNext]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD && hasPrev) onPrev();
    if (deltaX < -SWIPE_THRESHOLD && hasNext) onNext();
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={work.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-4xl flex-col gap-4"
          >
            <div className="aspect-video w-full overflow-hidden bg-black">
              <iframe
                key={work.id}
                src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?autoplay=1`}
                title={work.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="font-display text-h3 uppercase">{work.title}</h3>
                <p className="text-body-sm text-white/70">{work.context}</p>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label={t("previous")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label={t("next")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="text-h3 absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white md:top-8 md:right-8"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
