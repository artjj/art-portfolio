"use client";

import { useTranslations } from "next-intl";
import type { ContactContent } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface ContactProps {
  content: ContactContent;
}

export function Contact({ content }: ContactProps) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="pt-12 pb-24 md:pt-16 md:pb-32">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-display-l leading-none tracking-tight uppercase">
            {content.title}
          </h2>
          <p className="text-body-lg text-fg-muted mt-6 max-w-md">
            {content.invitation}
          </p>

          {/* E-mail é o elemento de maior destaque — fonte de texto (não a
              display, pensada pra caixa-alta) pra manter o endereço legível
              e reconhecível. break-words evita overflow em telas estreitas. */}
          <a
            href={`mailto:${content.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("emailCtaLabel")}
            className="text-h1 hover:text-accent-text mt-10 block max-w-full leading-tight font-semibold break-words underline decoration-2 underline-offset-8 transition-colors duration-200"
          >
            {content.email}
          </a>

          <div className="mt-10 flex items-center gap-8">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-text flex min-h-11 items-center gap-2 transition-colors duration-200"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="text-body-sm">Instagram</span>
            </a>
            <a
              href={content.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-text flex min-h-11 items-center gap-2 transition-colors duration-200"
            >
              <TiktokIcon className="h-5 w-5" />
              <span className="text-body-sm">TikTok</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.5 3c.3 1.9 1.6 3.4 3.5 3.8v2.6c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3-2.4 5.3-5.3 5.3S5.9 17.7 5.9 14.8c0-2.8 2.2-5.1 5-5.3v2.7c-1.3.2-2.3 1.3-2.3 2.6 0 1.5 1.2 2.6 2.6 2.6s2.6-1.2 2.6-2.6V3h2.7Z" />
    </svg>
  );
}
