import { sanityClient } from "@/sanity/client";
import {
  contactQuery,
  heroQuery,
  philosophyQuery,
  stylesQuery,
  timelineQuery,
  worksQuery,
} from "@/sanity/queries";
import type { Locale } from "@/i18n/routing";
import type {
  ContactContent,
  DanceStyle,
  HeroContent,
  PhilosophyContent,
  TimelineItem,
  Work,
} from "@/types/content";
import {
  contactContent as contactMock,
  heroContent as heroMock,
  philosophyContent as philosophyMock,
  stylesContent as stylesMock,
  timelineContent as timelineMock,
  worksContent as worksMock,
} from "@/lib/mock-content";

// Cada função tenta o Sanity (se configurado) e cai pro mock em caso de
// erro ou ausência de dado — o site nunca deve quebrar por falta de CMS.

export async function getHeroContent(locale: Locale): Promise<HeroContent> {
  if (!sanityClient) return heroMock[locale];

  try {
    const data = await sanityClient.fetch(heroQuery, { locale });
    if (!data?.headline || !data?.posterUrl) return heroMock[locale];

    return {
      headline: data.headline,
      tagline: data.tagline,
      video: {
        url: data.videoUrl ?? "",
        poster: {
          url: data.posterUrl,
          alt: data.posterAlt ?? data.headline,
          width: data.posterWidth ?? 1920,
          height: data.posterHeight ?? 1080,
        },
      },
    };
  } catch {
    return heroMock[locale];
  }
}

export async function getWorksContent(locale: Locale): Promise<Work[]> {
  if (!sanityClient) return worksMock[locale];

  try {
    const data = await sanityClient.fetch(worksQuery, { locale });
    if (!Array.isArray(data) || data.length === 0) return worksMock[locale];

    return data.map((item): Work => ({
      id: item.id,
      title: item.title,
      context: item.context,
      youtubeId: item.youtubeId ?? undefined,
      previewVideo: item.previewVideoUrl
        ? {
            url: item.previewVideoUrl,
            poster: {
              url: item.thumbnailUrl,
              alt: item.title,
              width: item.thumbnailWidth ?? 1920,
              height: item.thumbnailHeight ?? 1080,
            },
          }
        : undefined,
      thumbnail: {
        url: item.thumbnailUrl,
        alt: item.title,
        width: item.thumbnailWidth ?? 1920,
        height: item.thumbnailHeight ?? 1080,
      },
      choreographies: Array.isArray(item.choreographies)
        ? item.choreographies.map(
            (choreography: {
              title: string;
              thumbnailUrl: string;
              thumbnailWidth?: number;
              thumbnailHeight?: number;
              url: string;
            }) => ({
              title: choreography.title,
              thumbnail: {
                url: choreography.thumbnailUrl,
                alt: choreography.title,
                width: choreography.thumbnailWidth ?? 1200,
                height: choreography.thumbnailHeight ?? 1500,
              },
              url: choreography.url,
            }),
          )
        : undefined,
    }));
  } catch {
    return worksMock[locale];
  }
}

export async function getStylesContent(locale: Locale): Promise<DanceStyle[]> {
  if (!sanityClient) return stylesMock[locale];

  try {
    const data = await sanityClient.fetch(stylesQuery, { locale });
    if (!Array.isArray(data) || data.length === 0) return stylesMock[locale];

    return data.map((item): DanceStyle => ({
      id: item.id,
      name: item.name,
      description: item.description,
      featured: item.featured ?? false,
      image: {
        url: item.imageUrl,
        alt: item.imageAlt ?? item.name,
        width: item.imageWidth ?? 1200,
        height: item.imageHeight ?? 1500,
      },
    }));
  } catch {
    return stylesMock[locale];
  }
}

export async function getTimelineContent(
  locale: Locale,
): Promise<TimelineItem[]> {
  if (!sanityClient) return timelineMock[locale];

  try {
    const data = await sanityClient.fetch(timelineQuery, { locale });
    if (!Array.isArray(data) || data.length === 0) return timelineMock[locale];
    return data as TimelineItem[];
  } catch {
    return timelineMock[locale];
  }
}

export async function getPhilosophyContent(
  locale: Locale,
): Promise<PhilosophyContent> {
  if (!sanityClient) return philosophyMock[locale];

  try {
    const data = await sanityClient.fetch(philosophyQuery, { locale });
    if (!data?.quote || !data?.imageUrl) return philosophyMock[locale];

    return {
      quote: data.quote,
      body: data.body,
      image: {
        url: data.imageUrl,
        alt: data.imageAlt ?? data.quote,
        width: data.imageWidth ?? 1600,
        height: data.imageHeight ?? 2000,
      },
    };
  } catch {
    return philosophyMock[locale];
  }
}

export async function getContactContent(
  locale: Locale,
): Promise<ContactContent> {
  if (!sanityClient) return contactMock[locale];

  try {
    const data = await sanityClient.fetch(contactQuery, { locale });
    if (!data?.title || !data?.email) return contactMock[locale];
    return data as ContactContent;
  } catch {
    return contactMock[locale];
  }
}
