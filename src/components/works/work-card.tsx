"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import type { Work } from "@/types/content";
import { cn } from "@/lib/utils";

interface WorkCardProps {
  work: Work;
  onOpen: () => void;
  openLabel: string;
  // Definidos pelo coordenador de viewport em src/sections/works.tsx — só
  // relevantes em touch/mobile; no desktop hover/foco continuam intactos.
  isViewportActive?: boolean;
  autoplayEnabled?: boolean;
  cardRef?: (el: HTMLButtonElement | null) => void;
}

export function WorkCard({
  work,
  onOpen,
  openLabel,
  isViewportActive = false,
  autoplayEnabled = false,
  cardRef,
}: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play().catch(() => {});
  const pause = (resetTime: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    if (resetTime) video.currentTime = 0;
  };

  // Mobile (viewport): ativado pelo card mais visível na tela. Ao ficar
  // inativo, só pausa sem resetar — preserva o tempo caso volte a ficar
  // visível numa pequena rolagem, em vez de reiniciar do zero.
  useEffect(() => {
    if (!work.previewVideo) return;
    if (isViewportActive) {
      play();
    } else {
      pause(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewportActive]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={play}
      onMouseLeave={() => pause(true)}
      onFocus={play}
      onBlur={() => pause(true)}
      aria-label={openLabel}
      className="group relative aspect-[4/5] w-full overflow-hidden text-left"
    >
      <m.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={work.thumbnail.url}
          alt={work.thumbnail.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {work.previewVideo && (
          <video
            ref={videoRef}
            src={work.previewVideo.url}
            poster={work.previewVideo.poster.url}
            muted
            loop
            playsInline
            preload={autoplayEnabled ? "metadata" : "none"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100",
              isViewportActive && "opacity-100",
            )}
          />
        )}
      </m.div>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-white">
        <span className="font-display text-h3 tracking-tight uppercase">
          {work.title}
        </span>
        <span className="text-body-sm max-h-0 max-w-sm overflow-hidden text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 group-focus:max-h-20 group-focus:opacity-100">
          {work.context}
        </span>
      </div>
    </button>
  );
}
