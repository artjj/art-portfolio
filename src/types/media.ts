export interface ImageAsset {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface VideoAsset {
  url: string;
  poster: ImageAsset;
}
