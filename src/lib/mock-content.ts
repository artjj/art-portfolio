import type { Locale } from "@/i18n/routing";
import type { HeroContent } from "@/types/content";

// Mock temporário — substituir por dados reais do Sanity na Fase 4.
// Vídeo/foto do Hero ainda não foram fornecidos; usa-se apenas o
// placeholder visual (public/hero-placeholder.svg) até a mídia real chegar.
export const heroContent: Record<Locale, HeroContent> = {
  pt: {
    headline: "ART",
    tagline: "Transformando música em movimento.",
    video: {
      url: "",
      poster: {
        url: "/hero-placeholder.svg",
        alt: "ART em movimento — imagem em breve",
        width: 1920,
        height: 1080,
      },
    },
  },
  en: {
    headline: "ART",
    tagline: "Turning music into movement.",
    video: {
      url: "",
      poster: {
        url: "/hero-placeholder.svg",
        alt: "ART in motion — image coming soon",
        width: 1920,
        height: 1080,
      },
    },
  },
};
