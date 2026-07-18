import type { ImageAsset, VideoAsset } from "./media";

// Formas espelham o futuro schema do Sanity (doc 06 seção 4).
// Cada documento é consultado já filtrado por locale — os campos
// aqui representam sempre um único idioma resolvido, não pares PT/EN.

export interface HeroContent {
  headline: string;
  tagline: string;
  video: VideoAsset;
}

// Uma coreografia dentro de um trabalho-coleção (ex.: ARTSIDE) — só
// thumbnail + título + link, sem os campos de um trabalho de vídeo único.
export interface Choreography {
  title: string;
  thumbnail: ImageAsset;
  url: string;
}

export interface Work {
  id: string;
  title: string;
  context: string;
  // Ausentes em trabalhos-coleção (ex.: ARTSIDE), que usam `choreographies`
  // em vez de um único vídeo.
  youtubeId?: string;
  previewVideo?: VideoAsset;
  thumbnail: ImageAsset;
  // Presente apenas em trabalhos-coleção — abre uma galeria interna em vez
  // do modal de vídeo único.
  choreographies?: Choreography[];
}

export type DanceStyleId = "dancehall" | "krump" | "hiphop" | "popping";

export interface DanceStyle {
  id: DanceStyleId;
  name: string;
  description: string;
  featured: boolean;
  image: ImageAsset;
}

export interface TimelineItem {
  id: string;
  year: number;
  title: string;
  description: string;
}

// Tipo semântico da conquista — o mapeamento pro emoji (🥇🥈🥉🏅) acontece
// só no front-end (src/components/timeline/award-icon.tsx), nunca no CMS.
export type AwardType = "first" | "second" | "third" | "special";

// Destaque de medalhas/premiações em competições, exibido ao lado da
// Trajetória — documento próprio no Sanity, independente dos marcos da
// timeline (não é um TimelineItem).
export interface Achievement {
  id: string;
  competition: string;
  placement: string;
  year: number;
  awardType: AwardType;
  category?: string;
  image?: ImageAsset;
  externalUrl?: string;
}

export interface PhilosophyContent {
  quote: string;
  body: string;
  image: ImageAsset;
}

export interface ContactContent {
  title: string;
  invitation: string;
  instagramUrl: string;
  tiktokUrl: string;
  email: string;
}
