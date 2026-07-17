"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Carrega só o subconjunto de recursos do framer-motion usado no site
// (~6kb vs ~34kb do pacote completo) — reduz JS de hidratação, crítico
// pro LCP em conexões/CPUs mais lentas (doc 04 §9: Performance é Design).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
