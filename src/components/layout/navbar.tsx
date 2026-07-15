"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Container } from "./container";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navLinks } from "@/lib/nav-links";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");
  const locale = useLocale();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-surface/80 text-fg backdrop-blur-md"
            : "border-transparent bg-transparent text-white",
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <a
            href="#top"
            className="font-display text-h3 tracking-tight uppercase"
          >
            {common("siteName")}
          </a>

          <nav className="text-body-sm hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="underline-offset-4 transition-colors hover:underline"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="text-body-sm hidden items-center gap-2 md:flex"
              aria-label={t("language")}
            >
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href="/"
                  locale={loc}
                  aria-current={loc === locale ? "true" : undefined}
                  className={cn(
                    "uppercase",
                    loc === locale
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-100",
                  )}
                >
                  {loc}
                </Link>
              ))}
            </div>

            <ThemeToggle
              className={
                scrolled
                  ? undefined
                  : "border-white/40 text-white hover:border-white"
              }
            />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("openMenu")}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className="h-0.5 w-6 bg-current" />
              <span className="h-0.5 w-6 bg-current" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
