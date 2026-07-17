"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SIZE = 20;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea';

// Desktop only (doc 04 §11) — nunca substitui o cursor nativo em telas
// touch, e nunca impede clique/interação normal (doc 05 §8).
export function CustomCursor() {
  // Sempre false na renderização do servidor E na primeira passada do
  // cliente (hidratação) — window.matchMedia não existe no servidor, e
  // usar um lazy initializer aqui faria o servidor renderizar null e o
  // cliente renderizar a div real na mesma passada, causando mismatch de
  // hidratação (estrutura diferente, não só estilo).
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 35, stiffness: 500, mass: 0.4 });
  const springY = useSpring(y, { damping: 35, stiffness: 500, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Precisa rodar só depois da hidratação (matchMedia é client-only);
    // ver comentário acima sobre por que o lazy initializer não serve aqui.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
      const target = event.target as HTMLElement;
      setHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };

    document.documentElement.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      className="border-accent-text pointer-events-none fixed top-0 left-0 z-[100] rounded-full border"
      style={{
        width: SIZE,
        height: SIZE,
        x: reduceMotion ? x : springX,
        y: reduceMotion ? y : springY,
      }}
      animate={{ scale: hovering ? 1.8 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
