import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/sections/hero";
import { Works } from "@/sections/works";
import { Styles } from "@/sections/styles";
import { Timeline } from "@/sections/timeline";
import { Philosophy } from "@/sections/philosophy";
import { Contact } from "@/sections/contact";
import {
  heroContent,
  worksContent,
  stylesContent,
  timelineContent,
  philosophyContent,
  contactContent,
} from "@/lib/mock-content";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <main>
      <Hero content={heroContent[l]} />
      <Works works={worksContent[l]} />
      <Styles styles={stylesContent[l]} />
      <Timeline items={timelineContent[l]} />
      <Philosophy content={philosophyContent[l]} />
      <Contact content={contactContent[l]} />
    </main>
  );
}
