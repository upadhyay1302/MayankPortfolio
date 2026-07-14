"use client";
import { useEffect, useRef, useState, useCallback } from "react";

export function useScrollProgress() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressFillRef = useRef<HTMLSpanElement>(null);
  const activeSectionRef = useRef("");
  const showBackToTopRef = useRef(false);
  const rafRef = useRef(0);

  const getMaxScroll = useCallback(
    () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    []
  );

  useEffect(() => {
    const tick = () => {
      rafRef.current = 0;
      const y = window.scrollY;
      const maxScroll = getMaxScroll();
      const progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      const shouldShow = y > 560;
      if (showBackToTopRef.current !== shouldShow) {
        showBackToTopRef.current = shouldShow;
        setShowBackToTop(shouldShow);
      }

      const viewMid = window.innerHeight * 0.5;
      let next = "";
      for (const id of ["about", "experience", "research", "projects"]) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewMid && rect.bottom > viewMid) next = id;
        }
      }
      if (activeSectionRef.current !== next) {
        activeSectionRef.current = next;
        setActiveSection(next);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [getMaxScroll]);

  return { activeSection, showBackToTop, progressFillRef, getMaxScroll };
}
