"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="bg-bg text-fg fixed inset-0 z-[60] flex flex-col md:hidden"
        >
          <div className="flex h-20 items-center justify-end px-6">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t("closeMenu")}
              className="text-h3 flex h-11 w-11 items-center justify-center"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : 0.1 + index * 0.05,
                }}
                className="font-display text-display-l uppercase"
              >
                {t(link.labelKey)}
              </motion.a>
            ))}
          </nav>

          <div className="text-body-sm flex items-center justify-center gap-6 pb-10">
            {routing.locales.map((loc) => (
              <Link
                key={loc}
                href="/"
                locale={loc}
                onClick={onClose}
                aria-current={loc === locale ? "true" : undefined}
                className={cn(
                  "uppercase",
                  loc === locale ? "opacity-100" : "opacity-50",
                )}
              >
                {loc}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
