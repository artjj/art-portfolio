"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Card só "ativa" com ~60%+ de interseção; entre candidatos, uma
// diferença de proporção menor que isso é tratada como empate (desempate
// pela distância ao centro da viewport) — evita alternâncias por
// diferenças insignificantes durante a rolagem.
const ACTIVATION_RATIO = 0.6;
const RATIO_TIE_EPSILON = 0.02;
// Só decide o card ativo depois de a rolagem "assentar" por esse tempo —
// evita trocar de vídeo a cada pequeno movimento.
const SETTLE_DELAY_MS = 150;
// Vários limiares (não só um) pra receber atualizações de proporção com
// granularidade suficiente sem recorrer a um listener de scroll.
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

interface CardMetric {
  ratio: number;
  distanceToCenter: number;
}

interface ConnectionLike {
  saveData?: boolean;
}

// Autoplay dos previews de vídeo em Trabalhos guiado por visibilidade na
// viewport — só faz sentido em touch/mobile, onde não existe hover.
// Coordena um único IntersectionObserver compartilhado entre os cards pra
// garantir que no máximo um toque por vez, sem listener de scroll.
export function useViewportAutoplay() {
  const reduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const metricsRef = useRef(new Map<string, CardMetric>());
  const elementsRef = useRef(new Map<string, Element>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbacksRef = useRef(
    new Map<string, (el: HTMLElement | null) => void>(),
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    // Só pode rodar depois da hidratação (matchMedia é client-only) — ver
    // padrão equivalente já usado no projeto para detecção de dispositivo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouchDevice(mq.matches);
    const onPointerChange = (event: MediaQueryListEvent) =>
      setIsTouchDevice(event.matches);
    mq.addEventListener("change", onPointerChange);

    // API não padronizada (Chromium) — undefined em outros navegadores.
    const connection = (
      navigator as Navigator & { connection?: ConnectionLike }
    ).connection;
    setSaveData(!!connection?.saveData);

    return () => mq.removeEventListener("change", onPointerChange);
  }, []);

  const autoplayEnabled = isTouchDevice && !reduceMotion && !saveData;

  useEffect(() => {
    if (!autoplayEnabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveId(null);
      return;
    }

    const pickActive = () => {
      let bestId: string | null = null;
      let best: CardMetric | null = null;

      for (const [id, metric] of metricsRef.current) {
        if (metric.ratio < ACTIVATION_RATIO) continue;
        const isMeaningfullyHigher =
          !best || metric.ratio > best.ratio + RATIO_TIE_EPSILON;
        const isTieButCloserToCenter =
          best &&
          Math.abs(metric.ratio - best.ratio) <= RATIO_TIE_EPSILON &&
          metric.distanceToCenter < best.distanceToCenter;

        if (isMeaningfullyHigher || isTieButCloserToCenter) {
          best = metric;
          bestId = id;
        }
      }

      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2;

        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.autoplayCardId;
          if (!id) continue;

          const rect = entry.boundingClientRect;
          const elementCenter = rect.top + rect.height / 2;
          metricsRef.current.set(id, {
            ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
            distanceToCenter: Math.abs(elementCenter - viewportCenter),
          });
        }

        if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
        settleTimeoutRef.current = setTimeout(pickActive, SETTLE_DELAY_MS);
      },
      { threshold: THRESHOLDS },
    );

    observerRef.current = observer;
    for (const el of elementsRef.current.values()) observer.observe(el);

    return () => {
      observer.disconnect();
      observerRef.current = null;
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, [autoplayEnabled]);

  // Callback ref estável por id — evita observe/unobserve a cada
  // re-render (uma callback ref nova a cada render dispararia de novo).
  function registerCard(id: string) {
    let callback = callbacksRef.current.get(id);
    if (callback) return callback;

    callback = (el) => {
      const previous = elementsRef.current.get(id);
      if (previous && previous !== el) {
        observerRef.current?.unobserve(previous);
        metricsRef.current.delete(id);
      }

      if (el) {
        el.dataset.autoplayCardId = id;
        elementsRef.current.set(id, el);
        observerRef.current?.observe(el);
      } else {
        elementsRef.current.delete(id);
        metricsRef.current.delete(id);
      }
    };

    callbacksRef.current.set(id, callback);
    return callback;
  }

  return { activeId, autoplayEnabled, registerCard };
}
