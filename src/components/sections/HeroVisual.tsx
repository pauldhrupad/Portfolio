"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { Braces, Database, PanelsTopLeft } from "lucide-react";
import { motion, useSpring } from "motion/react";

const layers = [
  { id: "interface", title: "Interface", detail: "React / Next.js", Icon: PanelsTopLeft },
  { id: "application", title: "Application", detail: "Node.js / Express", Icon: Braces },
  { id: "data", title: "Data", detail: "MongoDB", Icon: Database },
] as const;

export function HeroVisual() {
  const capability = useRef<MediaQueryList | null>(null);
  const rotateX = useSpring(0, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    capability.current = query;
    const resetWhenDisabled = () => {
      if (!query.matches) {
        rotateX.jump(0);
        rotateY.jump(0);
      }
    };
    query.addEventListener("change", resetWhenDisabled);
    return () => query.removeEventListener("change", resetWhenDisabled);
  }, [rotateX, rotateY]);

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (!capability.current?.matches || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set((0.5 - (event.clientY - rect.top) / rect.height) * 6);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
  }

  return (
    <div
      aria-hidden="true"
      className="hero-visual relative w-full max-w-lg lg:mx-auto lg:aspect-square"
      onPointerMove={followPointer}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <div className="hero-art-grid absolute inset-0 rounded-full" />
      <motion.div className="relative grid gap-1.5 lg:absolute lg:inset-0 lg:block" style={{ rotateX, rotateY, transformPerspective: 900 }}>
        <svg className="absolute inset-0 hidden size-full text-border-strong lg:block" viewBox="0 0 520 520" fill="none">
          <circle cx="260" cy="260" r="223" stroke="currentColor" strokeDasharray="3 9" />
          <path d="M65 120V67H122M400 453H455V400" stroke="var(--accent-primary)" strokeWidth="2" />
          <path d="M72 226V306Q72 330 96 330H158M358 273H432Q455 273 455 296V372" stroke="var(--accent-cyan)" strokeWidth="1.5" />
          <circle cx="72" cy="226" r="4" fill="var(--accent-cyan)" />
          <circle cx="455" cy="372" r="4" fill="var(--accent-cyan)" />
        </svg>
        {layers.map(({ id, title, detail, Icon }) => (
          <div className="hero-architecture-layer" data-layer={id} key={id}>
            <div className="flex items-center justify-between gap-2 max-lg:flex-row-reverse">
              <span className="font-mono text-[0.65rem] uppercase leading-none tracking-[0.16em] text-text-muted sm:text-xs">{title}</span>
              <Icon className="size-4 text-accent-primary sm:size-5" strokeWidth={1.5} />
            </div>
            <p className="text-right text-sm font-semibold leading-tight tracking-tight text-text-primary lg:mt-2 lg:text-left lg:text-xl">{detail}</p>
          </div>
        ))}
      </motion.div>
      <p className="absolute inset-x-0 bottom-0 hidden text-center font-mono text-xs uppercase tracking-[0.14em] text-text-muted lg:block">
        Interface / Application / Data
      </p>
    </div>
  );
}
