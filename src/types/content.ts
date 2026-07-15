import type { ImageAsset, VideoAsset } from "./media";

// Formas espelham o futuro schema do Sanity (doc 06 seção 4).
// Cada documento é consultado já filtrado por locale — os campos
// aqui representam sempre um único idioma resolvido, não pares PT/EN.

export interface HeroContent {
  headline: string;
  tagline: string;
  video: VideoAsset;
}

export interface Work {
  id: string;
  title: string;
  context: string;
  youtubeId: string;
  previewVideo: VideoAsset;
  thumbnail: ImageAsset;
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
