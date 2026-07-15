import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/sections/hero";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { heroContent } from "@/lib/mock-content";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Common");

  return (
    <main>
      <Hero content={heroContent[locale as Locale]} />

      <Container className="flex justify-center py-24">
        <Card className="text-body-sm text-fg-muted max-w-sm text-center">
          {t("comingSoon")} Trabalhos, Estilos, Trajetória, Filosofia e Contato
          chegam na Fase 3.
        </Card>
      </Container>
    </main>
  );
}
