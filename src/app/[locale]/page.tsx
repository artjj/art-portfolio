import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Common");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <Reveal className="flex flex-col items-center gap-4">
        <h1 className="font-display text-display-l tracking-tight uppercase">
          {t("siteName")}
        </h1>
        <p className="text-body-lg text-fg-muted">{t("comingSoon")}</p>
      </Reveal>

      <div className="flex items-center gap-4">
        <Button variant="primary">Watch Reel</Button>
        <Button variant="secondary">Contact</Button>
        <ThemeToggle />
      </div>

      <Card className="text-body-sm text-fg-muted max-w-sm">
        Fundação da Fase 1: Design System, tema e i18n prontos para as seções
        das próximas fases.
      </Card>

      <nav className="text-body-sm flex gap-4" aria-label="Idioma">
        {routing.locales.map((locale) => (
          <Link key={locale} href="/" locale={locale} className="underline">
            {locale.toUpperCase()}
          </Link>
        ))}
      </nav>
    </main>
  );
}
