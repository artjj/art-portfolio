"use client";

import { useEffect, useState } from "react";

export function useScrolled(threshold = 8) {
  // Sempre inicia false (igual ao servidor, que não tem `window`) — ler
  // window.scrollY no valor inicial do estado causa mismatch de hidratação
  // quando a página já chega rolada (reload em scroll, navegação client-side).
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
