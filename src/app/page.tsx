"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Drawer from "@/components/layout/Drawer";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useModal } from "@/hooks/useModal";
import type { ExperienceModal } from "@/data/portfolio";
import { siteConfig } from "@/data/portfolio";

const siteAnnouncement = {
  href: siteConfig.resumePdf,
  text: "currently looking for winter 2027 positions:",
  linkLabel: "check my résumé",
};

function getGreeting(): string {
  const hour = new Date().getHours();
  const now = new Date();
  const day = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(now.getFullYear(), 0, 0)) / 86400000
  );
  const pick = (arr: string[]) => arr[(day * 31 + hour * 7) % arr.length];

  if (hour < 5)  return pick(["Up late. Same,", "Stars out, ideas flowing,", "Night owl mode,"]);
  if (hour < 12) return pick(["Hey, good morning,", "Morning. Let's get into it,", "Fresh day ahead,"]);
  if (hour < 18) return pick(["Good afternoon,", "Let's keep it going,", "Hey there,"]);
  return pick(["Good evening,", "Evening. Let's get into it,", "Hope today was good,"]);
}

const THEME_STORAGE_KEY = "theme";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [nightMode, setNightMode] = useState(true);

  // Read stored preference on mount (defaults to dark if none saved).
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light") setNightMode(false);
    if (stored === "dark") setNightMode(true);
  }, []);

  // Apply the theme to <body> and persist it.
  useEffect(() => {
    document.body.classList.toggle("night-mode", nightMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, nightMode ? "dark" : "light");
  }, [nightMode]);

  const toggleNightMode = useCallback(() => {
    setNightMode((prev) => !prev);
  }, []);

  const { activeSection, showBackToTop, progressFillRef, getMaxScroll } = useScrollProgress();
  const { activeModal, modalSection, openModal, closeModal, drawerCloseRef } = useModal();

  // Custom "plus" cursor refs
  const cursorRafRef = useRef<number>(0);
  const cursorPendingRef = useRef<{ x: number; y: number } | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const siteCursorRef = useRef<HTMLDivElement>(null);

  // Drawer image/body readiness (fade-in + placeholder while assets decode)
  const decodedDrawerImagesRef = useRef<Set<string>>(new Set());
  const [drawerImageReady, setDrawerImageReady] = useState(false);
  const [drawerBodyReady, setDrawerBodyReady] = useState(false);

  const ensureDrawerImageDecoded = useCallback(async (src: string) => {
    if (!src || decodedDrawerImagesRef.current.has(src)) return;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    try {
      if (typeof img.decode === "function") {
        await img.decode();
      } else {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }
    } catch {
      // no-op
    } finally {
      decodedDrawerImagesRef.current.add(src);
    }
  }, []);

  const warmModalAssets = useCallback((modal: ExperienceModal) => {
    const targets = [modal.image, ...(modal.preloadImages ?? [])].filter(Boolean);
    targets.forEach((src) => { void ensureDrawerImageDecoded(src); });
  }, [ensureDrawerImageDecoded]);

  useEffect(() => {
    if (!activeModal) {
      setDrawerImageReady(false);
      setDrawerBodyReady(false);
      return;
    }
    const decodeTargets = [activeModal.image, ...(activeModal.preloadImages ?? [])].filter(Boolean);
    const uniqueTargets = [...new Set(decodeTargets)];
    setDrawerImageReady(false);
    setDrawerBodyReady(false);
    let cancelled = false;
    Promise.all(uniqueTargets.map((src) => ensureDrawerImageDecoded(src))).then(() => {
      if (cancelled) return;
      setDrawerImageReady(true);
      // let drawer animation settle first frame before heavy content paints
      requestAnimationFrame(() => {
        if (!cancelled) setDrawerBodyReady(true);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [activeModal, ensureDrawerImageDecoded]);

  // SSR-safe greeting
  useEffect(() => { setGreeting(getGreeting()); }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const padding = parseFloat(getComputedStyle(el).paddingTop) || 114;
    window.scrollTo({ top: Math.max(0, Math.min(top + padding - 56 - 120, getMaxScroll())), behavior: "smooth" });
  }, [getMaxScroll]);

  const handleProgress = useCallback((key: string) => (progress: number) => {
    setRevealed((prev) => {
      const should = progress > 0.56;
      if (prev[key] === should) return prev;
      return { ...prev, [key]: should };
    });
  }, []);

  const handleCardClick = useCallback((modal: ExperienceModal, section: string, trigger: HTMLElement) => {
    openModal(modal, section, trigger);
  }, [openModal]);

  // Enable the custom cursor only on devices with a real mouse (fine pointer + hover).
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      document.body.classList.toggle("custom-cursor-on", mq.matches);
      if (!mq.matches) {
        document.body.classList.remove("custom-cursor-visible");
        if (cursorLabelRef.current) cursorLabelRef.current.classList.remove("visible");
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.body.classList.remove("custom-cursor-on");
      document.body.classList.remove("custom-cursor-visible");
    };
  }, []);

  // Track the pointer and move the cursor + label, batched via rAF.
  useEffect(() => {
    const showSiteCursor = () => {
      if (document.body.classList.contains("custom-cursor-on")) {
        document.body.classList.add("custom-cursor-visible");
      }
    };
    const hideSiteCursor = () => {
      document.body.classList.remove("custom-cursor-visible");
      if (cursorLabelRef.current) cursorLabelRef.current.classList.remove("visible");
    };
    const flushCursor = () => {
      cursorRafRef.current = 0;
      const pending = cursorPendingRef.current;
      if (!pending) return;
      if (cursorLabelRef.current) {
        cursorLabelRef.current.style.transform = `translate3d(${pending.x + 16}px, ${pending.y + 16}px, 0)`;
      }
      if (siteCursorRef.current) {
        siteCursorRef.current.style.transform = `translate3d(${pending.x - 17}px, ${pending.y - 17}px, 0)`;
      }
      cursorPendingRef.current = null;
    };
    const onPointerMove = (e: PointerEvent) => {
      showSiteCursor();
      cursorPendingRef.current = { x: e.clientX, y: e.clientY };
      if (!cursorRafRef.current) cursorRafRef.current = window.requestAnimationFrame(flushCursor);
    };
    const onRootMouseEnter = () => showSiteCursor();
    const onRootMouseLeave = () => hideSiteCursor();
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") hideSiteCursor();
    };
    const onWindowBlur = () => hideSiteCursor();
    const rootEl = document.documentElement;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rootEl.addEventListener("mouseenter", onRootMouseEnter);
    rootEl.addEventListener("mouseleave", onRootMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      rootEl.removeEventListener("mouseenter", onRootMouseEnter);
      rootEl.removeEventListener("mouseleave", onRootMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      if (cursorRafRef.current) window.cancelAnimationFrame(cursorRafRef.current);
      document.body.classList.remove("custom-cursor-visible");
    };
  }, []);

  // Optional: pass these down to cards if you want hover labels like "View project"
  const showCursor = useCallback((text: string) => {
    const el = cursorLabelRef.current;
    if (!el) return;
    if (el.textContent !== text) el.textContent = text;
    el.classList.add("visible");
  }, []);
  const hideCursor = useCallback(() => {
    const el = cursorLabelRef.current;
    if (!el) return;
    el.classList.remove("visible");
  }, []);

  const showLandingAnnouncement = showAnnouncement && activeSection === "" && !showBackToTop;

  return (
    <div className="site-shell">
      <Navbar
        activeSection={activeSection}
        progressFillRef={progressFillRef}
        scrollTo={scrollTo}
        nightMode={nightMode}
        onToggleNightMode={toggleNightMode}
      />

      <div
        className={`landing-announcement-shell${showLandingAnnouncement ? "" : " landing-announcement-hidden"}`}
      >
        <div
          className="site-banner"
          role="status"
          aria-live="polite"
          aria-hidden={!showLandingAnnouncement}
        >
          <div className="site-banner-inner">
            <span className="site-banner-copy">
              {siteAnnouncement.text}{" "}
              <a
                href={siteAnnouncement.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-banner-link"
              >
                {siteAnnouncement.linkLabel}
              </a>
            </span>
          </div>
          <button
            type="button"
            className="site-banner-close"
            aria-label="Dismiss update banner"
            onClick={() => setShowAnnouncement(false)}
            tabIndex={showLandingAnnouncement ? 0 : -1}
          >
            ×
          </button>
        </div>
      </div>

      <main id="top">
        <Hero greeting={greeting} nightMode={nightMode} />
        <About onProgress={handleProgress("about")} revealed={!!revealed.about} />
        <Experience onProgress={handleProgress("experience")} revealed={!!revealed.experience} onCardClick={handleCardClick} showCursor={showCursor} hideCursor={hideCursor} nightMode={nightMode} />
        {/* <Research onProgress={handleProgress("research")} revealed={!!revealed.research} onCardClick={handleCardClick} showCursor={showCursor} hideCursor={hideCursor} /> */}
        <Projects onProgress={handleProgress("projects")} revealed={!!revealed.projects} onCardClick={handleCardClick} showCursor={showCursor} hideCursor={hideCursor} nightMode={nightMode} />
      </main>

      <Footer nightMode={nightMode} />

      <Drawer
        activeModal={activeModal}
        modalSection={modalSection}
        closeModal={closeModal}
        drawerCloseRef={drawerCloseRef}
        drawerImageReady={drawerImageReady}
        drawerBodyReady={drawerBodyReady}
      />

      <button
        className={`back-to-top${showBackToTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        Back to top
      </button>

      <div ref={siteCursorRef} className="site-cursor-plus" aria-hidden="true" />
      <div ref={cursorLabelRef} className="cursor-label" aria-hidden="true" />
    </div>
  );
}