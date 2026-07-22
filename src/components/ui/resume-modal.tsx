"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { resumeUrl } from "@/lib/site";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

// Mesmo padrão visual/comportamental do AchievementModal (cartão de
// superfície, backdrop, foco preso, ESC, fechamento) — devolver o foco pro
// botão que abriu é responsabilidade do componente pai (Hero), como já
// acontece no AchievementsPanel.
export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const t = useTranslations("Resume");
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useFocusTrap(containerRef, open);

  useEffect(() => {
    if (!open) return;

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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
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
            className="border-border bg-surface flex h-[85svh] w-full max-w-3xl flex-col gap-4 border p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3
                id="resume-modal-title"
                className="font-display text-h3 tracking-tight uppercase"
              >
                {t("modalTitle")}
              </h3>
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

            {/* <object> tem fallback nativo do navegador: se o PDF não puder
                ser exibido, o conteúdo abaixo é renderizado automaticamente
                no lugar — sem precisar detectar a falha via JS. */}
            <object
              data={resumeUrl}
              type="application/pdf"
              className="border-border min-h-0 w-full flex-1 border"
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <p className="text-body-sm text-fg-muted">
                  {t("previewUnavailable")}
                </p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text text-body-sm underline underline-offset-4"
                >
                  {t("openInNewTab")}
                </a>
              </div>
            </object>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text text-body-sm underline underline-offset-4"
              >
                {t("openInNewTab")}
              </a>
              <a
                href={resumeUrl}
                download
                className="text-accent-text text-body-sm underline underline-offset-4"
              >
                {t("download")}
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
