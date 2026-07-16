import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// createClient valida projectId de forma síncrona e lança erro se vazio —
// só instanciar quando realmente configurado, senão quebra o build/app
// inteiro mesmo sem nenhuma query ser executada.
export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
