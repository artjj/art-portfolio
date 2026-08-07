import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// createClient valida projectId de forma síncrona e lança erro se vazio —
// só instanciar quando realmente configurado, senão quebra o build/app
// inteiro mesmo sem nenhuma query ser executada.
//
// useCdn: false — a revalidação sob demanda (ver src/app/api/revalidate)
// dispara um novo fetch assim que o Studio publica; com a CDN do Sanity
// ligada, esse fetch de revalidação poderia pegar uma resposta ainda
// cacheada por lá e servir conteúdo velho mesmo após o revalidateTag.
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;
