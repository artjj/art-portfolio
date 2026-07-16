import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/sections/hero";
import { Works } from "@/sections/works";
import { Styles } from "@/sections/styles";
import { Timeline } from "@/sections/timeline";
import { Philosophy } from "@/sections/philosophy";
import { Contact } from "@/sections/contact";
import {
  getContactContent,
  getHeroContent,
  getPhilosophyContent,
  getStylesContent,
  getTimelineContent,
  getWorksContent,
} from "@/lib/content";
import type { Locale } from "@/i18n/routing";

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
