"use client";

import { useRef } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import type { Work } from "@/types/content";

interface WorkCardProps {
  work: Work;
  onOpen: () => void;
  openLabel: string;
}

export function WorkCard({ work, onOpen, openLabel }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play().catch(() => {});
  const pause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
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
        <video
          ref={videoRef}
          src={work.previewVideo.url}
          poster={work.previewVideo.poster.url}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
        />
      </m.div>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-white">
        <span className="font-display text-h3 tracking-tight uppercase">
          {work.title}
        </span>
        <span className="text-body-sm max-w-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100">
          {work.context}
        </span>
      </div>
    </button>
  );
}
