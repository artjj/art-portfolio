import type { AwardType } from "@/types/content";
import { cn } from "@/lib/utils";

// Único lugar que traduz o tipo semântico salvo no Sanity pro emoji
// exibido — o CMS nunca guarda o emoji diretamente.
const AWARD_EMOJI: Record<AwardType, string> = {
  first: "🥇",
  second: "🥈",
  third: "🥉",
  special: "🏅",
};

interface AwardIconProps {
  type: AwardType;
  className?: string;
}

// Decorativo por padrão — o nome acessível vive no aria-label do elemento
// que envolve este ícone (botão ou cabeçalho do modal), nunca no emoji.
export function AwardIcon({ type, className }: AwardIconProps) {
  return (
    <span aria-hidden="true" className={cn(className)}>
      {AWARD_EMOJI[type]}
    </span>
  );
}
