"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Achievement } from "@/types/content";
import { AwardIcon } from "./award-icon";
import { AchievementModal } from "./achievement-modal";

interface AchievementsPanelProps {
  achievements: Achievement[];
}

// Sem corte de quantidade por enquanto — a lista atual é pequena e o
// flex-nowrap com rolagem interna já mantém a altura estável. Se crescer
// muito no futuro, cortar aqui (ex.: mostrar os N primeiros + botão "Ver
// todas" abrindo a coleção completa em modal) sem precisar mexer no
// restante do componente ou na integração com a seção Trajetória.
export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const t = useTranslations("Timeline");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Id da medalha em hover/foco, pra mostrar o resumo numa única linha
  // abaixo da fileira (não um balão flutuante por ícone): dentro de um
  // container com overflow-x-auto qualquer coisa posicionada de forma
  // absoluta que "escape" da caixa acaba cortada em qualquer direção
  // (inclusive nas laterais, pros ícones das pontas) — uma linha de texto
  // normal, fora da área que rola, não tem esse problema.
  const [summaryId, setSummaryId] = useState<string | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const suppressNextFocusIdRef = useRef<string | null>(null);

  if (achievements.length === 0) return null;

  const activeAchievement =
    activeIndex === null ? null : achievements[activeIndex];
  const summaryAchievement =
    achievements.find((achievement) => achievement.id === summaryId) ?? null;

  const handleClose = () => {
    const trigger =
      activeIndex === null ? null : triggerRefs.current[activeIndex];
    const closedAchievement = activeAchievement;
    setActiveIndex(null);
    if (trigger && closedAchievement) {
      // Devolve o foco pro botão-medalha que abriu o modal, mas sem deixar
      // esse foco reatribuído reabrir o resumo sozinho.
      suppressNextFocusIdRef.current = closedAchievement.id;
      trigger.focus();
    }
  };

  return (
    <div className="md:min-w-0 md:flex-1">
      <p className="text-body-sm text-fg-muted tracking-wide uppercase">
        {t("achievementsTitle")}
      </p>
      {/* flex-nowrap (não flex-wrap): conforme mais medalhas forem
          cadastradas, a fileira cresce na horizontal em vez de quebrar
          linha — permanece ao lado do título. overflow-x-auto é só um
          amparo caso um dia não caiba tudo, não um carrossel dedicado. */}
      <div className="mt-3 flex flex-nowrap gap-2 overflow-x-auto p-1">
        {achievements.map((achievement, index) => (
          <button
            key={achievement.id}
            ref={(el) => {
              triggerRefs.current[index] = el;
            }}
            type="button"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setSummaryId(achievement.id)}
            onMouseLeave={() =>
              setSummaryId((current) =>
                current === achievement.id ? null : current,
              )
            }
            onFocus={() => {
              if (suppressNextFocusIdRef.current === achievement.id) {
                suppressNextFocusIdRef.current = null;
                return;
              }
              setSummaryId(achievement.id);
            }}
            onBlur={() =>
              setSummaryId((current) =>
                current === achievement.id ? null : current,
              )
            }
            aria-label={t("openDetails", {
              placement: achievement.placement,
              competition: achievement.competition,
              year: achievement.year,
            })}
            className="border-border hover:border-accent-text hover:bg-surface focus-visible:border-accent-text flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-base transition-all duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:shadow-[0_0_0_3px_var(--color-accent-text)] focus-visible:outline-none"
          >
            <AwardIcon type={achievement.awardType} />
          </button>
        ))}
      </div>

      {/* Resumo complementar (hover/foco) — não é o único acesso à
          informação, só um resumo rápido; os detalhes completos sempre
          estão disponíveis no modal ao clicar/ativar. Altura reservada
          pra não deslocar o layout quando o texto aparece/some. */}
      <p aria-hidden="true" className="text-caption text-fg-muted mt-2 h-4">
        {summaryAchievement &&
          `${summaryAchievement.placement} · ${summaryAchievement.year}`}
      </p>

      <AchievementModal achievement={activeAchievement} onClose={handleClose} />
    </div>
  );
}
