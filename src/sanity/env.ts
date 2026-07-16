// Preencher no .env.local depois de criar o projeto em sanity.io/manage.
// Ver .env.example para instruções completas.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const isSanityConfigured = projectId.length > 0;
