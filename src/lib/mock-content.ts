import type { Locale } from "@/i18n/routing";
import type {
  Choreography,
  ContactContent,
  DanceStyle,
  HeroContent,
  PhilosophyContent,
  TimelineItem,
  Work,
} from "@/types/content";

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
        width: 1600,
        height: 1600,
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
        width: 1600,
        height: 1600,
      },
    },
  },
};

// PLACEHOLDER — coreografias do ARTSIDE ainda não fornecidas pelo Arthur.
// Thumbnail e link são genéricos só para demonstrar o layout da galeria;
// substituir por conteúdo real (ver instruções no fim do arquivo/README).
function artsidePlaceholderChoreographies(labelPrefix: string): Choreography[] {
  return [1, 2, 3].map((n) => ({
    title: `${labelPrefix} ${n}`,
    thumbnail: {
      url: "/works/artside-placeholder.svg",
      alt: `${labelPrefix} ${n} — thumbnail em breve`,
      width: 1200,
      height: 1500,
    },
    url: "#",
  }));
}

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
          width: 1280,
          height: 720,
        },
      },
      thumbnail: {
        url: "/works/ccxp-thumb.jpg",
        alt: "CCXP 2025 — Golden: O Show de K-Pop",
        width: 1280,
        height: 720,
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
          width: 1280,
          height: 720,
        },
      },
      thumbnail: {
        url: "/works/kpop-em-ritmo-thumb.jpg",
        alt: "ART x K-Pop em Ritmo — workshop",
        width: 1280,
        height: 720,
      },
    },
    {
      id: "artside",
      title: "ARTSIDE",
      context:
        "Projeto contínuo de coreografias autorais — uma coleção que cresce ao longo do tempo.",
      thumbnail: {
        url: "/works/artside-placeholder.svg",
        alt: "ARTSIDE — capa em breve",
        width: 1200,
        height: 1500,
      },
      choreographies: artsidePlaceholderChoreographies(
        "[Placeholder] Coreografia",
      ),
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
          width: 1280,
          height: 720,
        },
      },
      thumbnail: {
        url: "/works/ccxp-thumb.jpg",
        alt: "CCXP 2025 — Golden: The K-Pop Show",
        width: 1280,
        height: 720,
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
          width: 1280,
          height: 720,
        },
      },
      thumbnail: {
        url: "/works/kpop-em-ritmo-thumb.jpg",
        alt: "ART x K-Pop em Ritmo — workshop",
        width: 1280,
        height: 720,
      },
    },
    {
      id: "artside",
      title: "ARTSIDE",
      context:
        "An ongoing project of original choreographies — a collection that grows over time.",
      thumbnail: {
        url: "/works/artside-placeholder.svg",
        alt: "ARTSIDE — cover coming soon",
        width: 1200,
        height: 1500,
      },
      choreographies: artsidePlaceholderChoreographies(
        "[Placeholder] Choreography",
      ),
    },
  ],
};

// PLACEHOLDER — descrições ainda não escritas pelo Arthur. Não usar como
// conteúdo final; textos aqui só demonstram o layout.
export const stylesContent: Record<Locale, DanceStyle[]> = {
  pt: [
    {
      id: "dancehall",
      name: "Dancehall",
      description:
        "[Placeholder] Texto sobre a pesquisa em Dancehall — a definir.",
      featured: true,
      image: {
        url: "/styles/dancehall-placeholder.svg",
        alt: "Dancehall — imagem em breve",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "krump",
      name: "Krump",
      description: "[Placeholder] Texto sobre a pesquisa em Krump — a definir.",
      featured: true,
      image: {
        url: "/styles/krump-placeholder.svg",
        alt: "Krump — imagem em breve",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "hiphop",
      name: "Hip Hop",
      description: "[Placeholder] Texto sobre Hip Hop — a definir.",
      featured: false,
      image: {
        url: "/styles/hiphop-placeholder.svg",
        alt: "Hip Hop — imagem em breve",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "popping",
      name: "Popping",
      description: "[Placeholder] Texto sobre Popping — a definir.",
      featured: false,
      image: {
        url: "/styles/popping-placeholder.svg",
        alt: "Popping — imagem em breve",
        width: 1200,
        height: 1500,
      },
    },
  ],
  en: [
    {
      id: "dancehall",
      name: "Dancehall",
      description: "[Placeholder] Text about the Dancehall research — TBD.",
      featured: true,
      image: {
        url: "/styles/dancehall-placeholder.svg",
        alt: "Dancehall — image coming soon",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "krump",
      name: "Krump",
      description: "[Placeholder] Text about the Krump research — TBD.",
      featured: true,
      image: {
        url: "/styles/krump-placeholder.svg",
        alt: "Krump — image coming soon",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "hiphop",
      name: "Hip Hop",
      description: "[Placeholder] Text about Hip Hop — TBD.",
      featured: false,
      image: {
        url: "/styles/hiphop-placeholder.svg",
        alt: "Hip Hop — image coming soon",
        width: 1200,
        height: 1500,
      },
    },
    {
      id: "popping",
      name: "Popping",
      description: "[Placeholder] Text about Popping — TBD.",
      featured: false,
      image: {
        url: "/styles/popping-placeholder.svg",
        alt: "Popping — image coming soon",
        width: 1200,
        height: 1500,
      },
    },
  ],
};

// PLACEHOLDER — anos e marcos ainda não fornecidos pelo Arthur. Estrutura
// de demonstração apenas; não representa a trajetória real.
export const timelineContent: Record<Locale, TimelineItem[]> = {
  pt: [
    {
      id: "milestone-1",
      year: 2021,
      title: "[Placeholder] Marco a definir",
      description: "Descrição curta a definir.",
    },
    {
      id: "milestone-2",
      year: 2022,
      title: "[Placeholder] Marco a definir",
      description: "Descrição curta a definir.",
    },
    {
      id: "milestone-3",
      year: 2023,
      title: "[Placeholder] Marco a definir",
      description: "Descrição curta a definir.",
    },
    {
      id: "milestone-4",
      year: 2024,
      title: "[Placeholder] Marco a definir",
      description: "Descrição curta a definir.",
    },
  ],
  en: [
    {
      id: "milestone-1",
      year: 2021,
      title: "[Placeholder] Milestone TBD",
      description: "Short description TBD.",
    },
    {
      id: "milestone-2",
      year: 2022,
      title: "[Placeholder] Milestone TBD",
      description: "Short description TBD.",
    },
    {
      id: "milestone-3",
      year: 2023,
      title: "[Placeholder] Milestone TBD",
      description: "Short description TBD.",
    },
    {
      id: "milestone-4",
      year: 2024,
      title: "[Placeholder] Milestone TBD",
      description: "Short description TBD.",
    },
  ],
};

// PLACEHOLDER — frase de impacto e texto ainda não escritos pelo Arthur.
export const philosophyContent: Record<Locale, PhilosophyContent> = {
  pt: {
    quote: "[Placeholder] Frase de impacto a definir.",
    body: "[Placeholder] Texto curto apresentando a visão artística — a definir.",
    image: {
      url: "/philosophy/philosophy-placeholder.svg",
      alt: "Filosofia — imagem em breve",
      width: 1600,
      height: 2000,
    },
  },
  en: {
    quote: "[Placeholder] Impact phrase TBD.",
    body: "[Placeholder] Short text introducing the artistic vision — TBD.",
    image: {
      url: "/philosophy/philosophy-placeholder.svg",
      alt: "Philosophy — image coming soon",
      width: 1600,
      height: 2000,
    },
  },
};

// PLACEHOLDER — links reais de Instagram/TikTok e e-mail ainda não
// fornecidos. Substituir antes de publicar.
export const contactContent: Record<Locale, ContactContent> = {
  pt: {
    title: "Vamos criar juntos",
    invitation: "[Placeholder] Texto de convite para contato — a definir.",
    instagramUrl: "#",
    tiktokUrl: "#",
    email: "contato@example.com",
  },
  en: {
    title: "Let's create together",
    invitation: "[Placeholder] Contact invitation text — TBD.",
    instagramUrl: "#",
    tiktokUrl: "#",
    email: "contato@example.com",
  },
};
