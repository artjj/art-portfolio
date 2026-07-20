"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { ContactContent } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

interface ContactProps {
  content: ContactContent;
}

type CopyState = "idle" | "copied" | "error";

// Fallback pra navegadores/contextos sem Clipboard API (ex.: http não
// seguro) — técnica clássica de textarea temporário + execCommand.
function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

export function Contact({ content }: ContactProps) {
  const t = useTranslations("Contact");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  function scheduleReset(state: CopyState) {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setCopyState(state);
    resetTimeoutRef.current = setTimeout(() => setCopyState("idle"), 2000);
  }

  function handleEmailCopy(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(content.email).then(
        () => scheduleReset("copied"),
        () => {
          if (legacyCopy(content.email)) {
            scheduleReset("copied");
          } else {
            scheduleReset("error");
            // Alternativa acessível: abre o app de e-mail do usuário quando
            // a cópia não é possível de forma alguma.
            window.open(`mailto:${content.email}`, "_blank", "noopener");
          }
        },
      );
      return;
    }

    if (legacyCopy(content.email)) {
      scheduleReset("copied");
    } else {
      scheduleReset("error");
      window.open(`mailto:${content.email}`, "_blank", "noopener");
    }
  }

  const label =
    copyState === "copied"
      ? t("copiedLabel")
      : copyState === "error"
        ? t("copyErrorLabel")
        : t("emailLabel");

  const liveMessage =
    copyState === "copied"
      ? t("copiedAnnouncement")
      : copyState === "error"
        ? t("copyErrorAnnouncement")
        : "";

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

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${content.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("copyEmailAriaLabel")}
              onClick={handleEmailCopy}
              className="hover:text-accent-text flex min-h-11 items-center gap-2 transition-colors duration-200"
            >
              {copyState === "copied" ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <MailIcon className="h-5 w-5" />
              )}
              <span className="text-body-sm">{label}</span>
            </a>
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

          <span aria-live="polite" className="sr-only">
            {liveMessage}
          </span>
        </Reveal>
      </Container>
    </section>
  );
}

function MailIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
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
