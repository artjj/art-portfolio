"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Work } from "@/types/content";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface ChoreographyGalleryModalProps {
  work: Work | null;
  onClose: () => void;
}

// Modal-galeria para trabalhos-coleção (ex.: ARTSIDE): mesma linguagem
// visual/comportamental do WorkModal (backdrop, foco, ESC, fechamento),
// mas mostra uma grade de coreografias em vez de um único vídeo.
export function ChoreographyGalleryModal({
  work,
  onClose,
}: ChoreographyGalleryModalProps) {
  const t = useTranslations("Works");
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useFocusTrap(containerRef, !!work);

  useEffect(() => {
    if (!work) return;

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
  }, [work, onClose]);

  const choreographies = work?.choreographies ?? [];

  return (
    <AnimatePresence>
      {work && (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={work.title}
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
            className="flex max-h-[85vh] w-full max-w-4xl flex-col gap-6 overflow-y-auto"
          >
            <h3 className="font-display text-h3 text-white uppercase">
              {work.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {choreographies.map((item, index) => (
                <a
                  key={`${item.url}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src={item.thumbnail.url}
                    alt={item.thumbnail.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="font-display text-body-sm absolute inset-x-0 bottom-0 p-3 text-white uppercase">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </m.div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="text-h3 absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white md:top-8 md:right-8"
          >
            ×
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
