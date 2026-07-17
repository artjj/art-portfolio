import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/sections/hero";
import {
  getContactContent,
  getHeroContent,
  getPhilosophyContent,
  getStylesContent,
  getTimelineContent,
  getWorksContent,
} from "@/lib/content";
import type { Locale } from "@/i18n/routing";

// Abaixo da dobra — code-split para não competir com a hidratação do
// Hero (LCP) na carga inicial (doc 04 §9: Performance é Design).
const Works = dynamic(() => import("@/sections/works").then((m) => m.Works));
const Styles = dynamic(() => import("@/sections/styles").then((m) => m.Styles));
const Timeline = dynamic(() =>
  import("@/sections/timeline").then((m) => m.Timeline),
);
const Philosophy = dynamic(() =>
  import("@/sections/philosophy").then((m) => m.Philosophy),
);
const Contact = dynamic(() =>
  import("@/sections/contact").then((m) => m.Contact),
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const [hero, works, styles, timeline, philosophy, contact] =
    await Promise.all([
      getHeroContent(l),
      getWorksContent(l),
      getStylesContent(l),
      getTimelineContent(l),
      getPhilosophyContent(l),
      getContactContent(l),
    ]);

  return (
    <main>
      <Hero content={hero} />
      <Works works={works} />
      <Styles styles={styles} />
      <Timeline items={timeline} />
      <Philosophy content={philosophy} />
      <Contact content={contact} />
    </main>
  );
}
