// GROQ ainda não testado contra um dataset real — sem credenciais do
// Sanity configuradas (ver .env.example), isSanityConfigured é sempre
// false e esse código nunca roda; o site usa src/lib/mock-content.ts.
// Ao conectar um projeto real, validar essas queries no Vision (aba do
// Studio) antes de confiar cegamente nelas.

export const heroQuery = /* groq */ `
*[_type == "hero"][0]{
  "headline": headline[$locale],
  "tagline": tagline[$locale],
  "videoUrl": video.asset->url,
  "posterUrl": poster.asset->url,
  "posterAlt": coalesce(poster.alt, headline[$locale]),
  "posterWidth": poster.asset->metadata.dimensions.width,
  "posterHeight": poster.asset->metadata.dimensions.height,
}`;

export const worksQuery = /* groq */ `
*[_type == "work"] | order(order asc){
  "id": _id,
  title,
  "context": context[$locale],
  youtubeId,
  "previewVideoUrl": previewVideo.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  "thumbnailWidth": thumbnail.asset->metadata.dimensions.width,
  "thumbnailHeight": thumbnail.asset->metadata.dimensions.height,
}`;

export const stylesQuery = /* groq */ `
*[_type == "danceStyle"]{
  "id": styleId,
  name,
  "description": description[$locale],
  featured,
  "imageUrl": image.asset->url,
  "imageAlt": name,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
}`;

export const timelineQuery = /* groq */ `
*[_type == "timelineItem"] | order(year asc){
  "id": _id,
  year,
  "title": title[$locale],
  "description": description[$locale],
}`;

export const philosophyQuery = /* groq */ `
*[_type == "philosophy"][0]{
  "quote": quote[$locale],
  "body": body[$locale],
  "imageUrl": image.asset->url,
  "imageAlt": quote[$locale],
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
}`;

export const contactQuery = /* groq */ `
*[_type == "contact"][0]{
  "title": title[$locale],
  "invitation": invitation[$locale],
  instagramUrl,
  tiktokUrl,
  email,
}`;
