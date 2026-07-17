// Popula o Sanity com o conteúdo que hoje vive em src/lib/mock-content.ts,
// como ponto de partida pra edição no Studio (em vez de criar cada
// documento do zero manualmente). Idempotente: usa _id fixo por documento
// e createOrReplace, então rodar de novo apenas atualiza os mesmos
// documentos (mas reenvia as imagens/vídeos a cada execução).
//
// Uso: npm run seed:sanity
// Requer SANITY_API_WRITE_TOKEN no .env.local (ver .env.example).

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(rootDir, "public");

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltam variáveis no .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID e/ou " +
      "SANITY_API_WRITE_TOKEN. Ver instruções em .env.example.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// PLACEHOLDER — textos e links marcados abaixo ainda precisam ser
// substituídos pelo conteúdo real; o script só destrava a edição no Studio.
const PLACEHOLDER_URL = "https://www.instagram.com/";

const assetCache = new Map();

async function uploadAsset(kind, relPath) {
  const cacheKey = `${kind}:${relPath}`;
  if (assetCache.has(cacheKey)) return assetCache.get(cacheKey);

  const absPath = path.join(publicDir, relPath);
  const buffer = fs.readFileSync(absPath);
  const filename = path.basename(relPath);
  const asset = await client.assets.upload(kind, buffer, {
    filename,
    contentType: guessContentType(filename),
  });

  const ref = {
    _type: kind,
    asset: { _type: "reference", _ref: asset._id },
  };
  assetCache.set(cacheKey, ref);
  console.log(`  ↳ enviado: ${relPath}`);
  return ref;
}

function guessContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  return (
    {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".mp4": "video/mp4",
    }[ext] ?? "application/octet-stream"
  );
}

async function seedHero() {
  console.log("Hero...");
  return client.createOrReplace({
    _id: "hero",
    _type: "hero",
    headline: { pt: "ART", en: "ART" },
    tagline: {
      pt: "Transformando música em movimento.",
      en: "Turning music into movement.",
    },
    video: await uploadAsset("file", "hero/hero.mp4"),
    poster: await uploadAsset("image", "hero/hero-poster.jpg"),
  });
}

async function seedWorks() {
  console.log("Trabalhos...");
  const ccxp = client.createOrReplace({
    _id: "work-ccxp-2025",
    _type: "work",
    title: "CCXP 2025",
    context: {
      pt: "Participação como dançarino/intérprete na performance Golden: O Show de K-Pop, idealizada pela Omelete em conjunto com o WarzoneDG.",
      en: 'Performer/dancer in "Golden: The K-Pop Show," created by Omelete in partnership with WarzoneDG.',
    },
    youtubeId: "PJemSGbkqM0",
    previewVideo: await uploadAsset("file", "works/ccxp.mp4"),
    thumbnail: await uploadAsset("image", "works/ccxp-thumb.jpg"),
    order: 1,
  });

  const kpop = client.createOrReplace({
    _id: "work-art-x-kpop-em-ritmo",
    _type: "work",
    title: "ART x K-Pop em Ritmo",
    context: {
      pt: "Realização de workshop de coreografia autoral em K-Pop, em parceria com a K-Pop em Ritmo.",
      en: "Led an original K-Pop choreography workshop in partnership with K-Pop em Ritmo.",
    },
    youtubeId: "FXFRDS9akUQ",
    previewVideo: await uploadAsset("file", "works/kpop-em-ritmo.mp4"),
    thumbnail: await uploadAsset("image", "works/kpop-em-ritmo-thumb.jpg"),
    order: 2,
  });

  const choreographyThumb = await uploadAsset(
    "image",
    "works/artside-placeholder.svg",
  );
  const artside = client.createOrReplace({
    _id: "work-artside",
    _type: "work",
    title: "ARTSIDE",
    context: {
      pt: "Projeto contínuo de coreografias autorais — uma coleção que cresce ao longo do tempo.",
      en: "An ongoing project of original choreographies — a collection that grows over time.",
    },
    thumbnail: choreographyThumb,
    order: 3,
    // PLACEHOLDER — substituir pelas coreografias reais (título, thumbnail
    // e link do Reels) direto no Studio.
    choreographies: [1, 2, 3].map((n) => ({
      _key: `placeholder-${n}`,
      title: `[Placeholder] Coreografia ${n}`,
      thumbnail: choreographyThumb,
      url: PLACEHOLDER_URL,
    })),
  });

  return Promise.all([ccxp, kpop, artside]);
}

async function seedStyles() {
  console.log("Estilos...");
  const styles = [
    {
      id: "dancehall",
      name: "Dancehall",
      featured: true,
      image: "styles/dancehall-placeholder.svg",
      pt: "[Placeholder] Texto sobre a pesquisa em Dancehall — a definir.",
      en: "[Placeholder] Text about the Dancehall research — TBD.",
    },
    {
      id: "krump",
      name: "Krump",
      featured: true,
      image: "styles/krump-placeholder.svg",
      pt: "[Placeholder] Texto sobre a pesquisa em Krump — a definir.",
      en: "[Placeholder] Text about the Krump research — TBD.",
    },
    {
      id: "hiphop",
      name: "Hip Hop",
      featured: false,
      image: "styles/hiphop-placeholder.svg",
      pt: "[Placeholder] Texto sobre Hip Hop — a definir.",
      en: "[Placeholder] Text about Hip Hop — TBD.",
    },
    {
      id: "popping",
      name: "Popping",
      featured: false,
      image: "styles/popping-placeholder.svg",
      pt: "[Placeholder] Texto sobre Popping — a definir.",
      en: "[Placeholder] Text about Popping — TBD.",
    },
  ];

  return Promise.all(
    styles.map(async (style) =>
      client.createOrReplace({
        _id: `style-${style.id}`,
        _type: "danceStyle",
        styleId: style.id,
        name: style.name,
        featured: style.featured,
        description: { pt: style.pt, en: style.en },
        image: await uploadAsset("image", style.image),
      }),
    ),
  );
}

async function seedTimeline() {
  console.log("Trajetória...");
  const years = [2021, 2022, 2023, 2024];
  return Promise.all(
    years.map((year, index) =>
      client.createOrReplace({
        _id: `timeline-milestone-${index + 1}`,
        _type: "timelineItem",
        year,
        title: {
          pt: "[Placeholder] Marco a definir",
          en: "[Placeholder] Milestone TBD",
        },
        description: {
          pt: "Descrição curta a definir.",
          en: "Short description TBD.",
        },
      }),
    ),
  );
}

async function seedPhilosophy() {
  console.log("Filosofia...");
  return client.createOrReplace({
    _id: "philosophy",
    _type: "philosophy",
    quote: {
      pt: "[Placeholder] Frase de impacto a definir.",
      en: "[Placeholder] Impact phrase TBD.",
    },
    body: {
      pt: "[Placeholder] Texto curto apresentando a visão artística — a definir.",
      en: "[Placeholder] Short text introducing the artistic vision — TBD.",
    },
    image: await uploadAsset("image", "philosophy/philosophy-placeholder.svg"),
  });
}

async function seedContact() {
  console.log("Contato...");
  return client.createOrReplace({
    _id: "contact",
    _type: "contact",
    title: { pt: "Vamos criar juntos", en: "Let's create together" },
    invitation: {
      pt: "[Placeholder] Texto de convite para contato — a definir.",
      en: "[Placeholder] Contact invitation text — TBD.",
    },
    // PLACEHOLDER — trocar pelos links reais.
    instagramUrl: PLACEHOLDER_URL,
    tiktokUrl: "https://www.tiktok.com/",
    email: "contato@example.com",
  });
}

function loadEnvLocal() {
  const envPath = path.join(rootDir, ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

async function main() {
  console.log(`Populando dataset "${dataset}" do projeto ${projectId}...\n`);

  await seedHero();
  await seedWorks();
  await seedStyles();
  await seedTimeline();
  await seedPhilosophy();
  await seedContact();

  console.log(
    "\nPronto. Abra /studio e edite os campos marcados [Placeholder] " +
      "(Estilos, Trajetória, Filosofia, Contato e as coreografias do " +
      "ARTSIDE) com o conteúdo real.",
  );
}

main().catch((error) => {
  console.error("\nFalha ao popular o Sanity:", error.message);
  process.exit(1);
});
