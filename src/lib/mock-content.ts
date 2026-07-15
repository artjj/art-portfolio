import type { Locale } from "@/i18n/routing";
import type { HeroContent, Work } from "@/types/content";

// Mock temporário — substituir por dados reais do Sanity na Fase 4.
export const heroContent: Record<Locale, HeroContent> = {
  pt: {
    headline: "ART",
    tagline: "Transformando música em movimento.",
    video: {
      url: "/hero/hero.mp4",
      poster: {
        url: "/hero/hero-poster.jpg",
        alt: "ART em movimento",
        width: 1986,
        height: 1986,
      },
    },
  },
  en: {
    headline: "ART",
    tagline: "Turning music into movement.",
    video: {
      url: "/hero/hero.mp4",
      poster: {
        url: "/hero/hero-poster.jpg",
        alt: "ART in motion",
        width: 1986,
        height: 1986,
      },
    },
  },
};

// Traduções EN dos campos de texto ainda não foram revisadas pelo Arthur —
// conferir antes de publicar.
export const worksContent: Record<Locale, Work[]> = {
  pt: [
    {
      id: "ccxp-2025",
      title: "CCXP 2025",
      context:
        "Participação como dançarino/intérprete na performance Golden: O Show de K-Pop, idealizada pela Omelete em conjunto com o WarzoneDG.",
      youtubeId: "PJemSGbkqM0",
      previewVideo: {
        url: "/works/ccxp.mp4",
        poster: {
          url: "/works/ccxp-thumb.jpg",
          alt: "CCXP 2025 — Golden: O Show de K-Pop",
          width: 1920,
          height: 1080,
        },
      },
      thumbnail: {
        url: "/works/ccxp-thumb.jpg",
        alt: "CCXP 2025 — Golden: O Show de K-Pop",
        width: 1920,
        height: 1080,
      },
    },
    {
      id: "art-x-kpop-em-ritmo",
      title: "ART x K-Pop em Ritmo",
      context:
        "Realização de workshop de coreografia autoral em K-Pop, em parceria com a K-Pop em Ritmo.",
      youtubeId: "FXFRDS9akUQ",
      previewVideo: {
        url: "/works/kpop-em-ritmo.mp4",
        poster: {
          url: "/works/kpop-em-ritmo-thumb.jpg",
          alt: "ART x K-Pop em Ritmo — workshop",
          width: 1920,
          height: 1080,
        },
      },
      thumbnail: {
        url: "/works/kpop-em-ritmo-thumb.jpg",
        alt: "ART x K-Pop em Ritmo — workshop",
        width: 1920,
        height: 1080,
      },
    },
  ],
  en: [
    {
      id: "ccxp-2025",
      title: "CCXP 2025",
      context:
        'Performer/dancer in "Golden: The K-Pop Show," created by Omelete in partnership with WarzoneDG.',
      youtubeId: "PJemSGbkqM0",
      previewVideo: {
        url: "/works/ccxp.mp4",
        poster: {
          url: "/works/ccxp-thumb.jpg",
          alt: "CCXP 2025 — Golden: The K-Pop Show",
          width: 1920,
          height: 1080,
        },
      },
      thumbnail: {
        url: "/works/ccxp-thumb.jpg",
        alt: "CCXP 2025 — Golden: The K-Pop Show",
        width: 1920,
        height: 1080,
      },
    },
    {
      id: "art-x-kpop-em-ritmo",
      title: "ART x K-Pop em Ritmo",
      context:
        "Led an original K-Pop choreography workshop in partnership with K-Pop em Ritmo.",
      youtubeId: "FXFRDS9akUQ",
      previewVideo: {
        url: "/works/kpop-em-ritmo.mp4",
        poster: {
          url: "/works/kpop-em-ritmo-thumb.jpg",
          alt: "ART x K-Pop em Ritmo — workshop",
          width: 1920,
          height: 1080,
        },
      },
      thumbnail: {
        url: "/works/kpop-em-ritmo-thumb.jpg",
        alt: "ART x K-Pop em Ritmo — workshop",
        width: 1920,
        height: 1080,
      },
    },
  ],
};
