"use client";

import { useTranslations } from "next-intl";
import type { ContactContent } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";

interface ContactProps {
  content: ContactContent;
}

export function Contact({ content }: ContactProps) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="pt-12 pb-24 md:pt-16 md:pb-32">
      <Container>
        <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-display-l leading-none tracking-tight uppercase">
              {content.title}
            </h2>
            <p className="text-body-lg text-fg-muted mt-6 max-w-md">
              {content.invitation}
            </p>

            <div className="mt-10 flex flex-col items-start gap-4">
              <Button
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                {t("instagramCta")}
              </Button>
              <div className="text-body-sm flex gap-6 underline underline-offset-4">
                <a
                  href={content.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("tiktokLabel")}
                </a>
                <a
                  href={`mailto:${content.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("emailCtaLabel")}
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
