import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Mapeia o _type do documento Sanity pra tag usada nos fetches em
// src/lib/content.ts — precisa ficar em sincronia com aquele arquivo.
const TYPE_TO_TAG: Record<string, string> = {
  hero: "hero",
  work: "works",
  danceStyle: "styles",
  timelineItem: "timeline",
  achievement: "achievements",
  philosophy: "philosophy",
  contact: "contact",
};

// Endpoint chamado pelo webhook do Sanity (Settings → API → Webhooks) a
// cada publish. Só invalida o cache do Next; se o webhook nunca for
// configurado, o site continua funcionando normalmente, só sem
// atualização automática.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Assinatura inválida" },
        { status: 401 },
      );
    }

    const type = body?._type;
    const tag = type ? TYPE_TO_TAG[type] : undefined;

    if (!tag) {
      return NextResponse.json(
        { message: `_type desconhecido ou ausente: ${type ?? "n/a"}` },
        { status: 400 },
      );
    }

    // "max" força expiração total da tag, independente de qualquer
    // cacheLife configurado — é o equivalente ao antigo revalidateTag(tag)
    // de argumento único, hoje deprecado no Next 16.
    revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Erro desconhecido" },
      { status: 500 },
    );
  }
}
