"use client";
import { useRef, useCallback } from "react";
import FloatingBird from "@/components/ui/FloatingBird";
import { siteConfig } from "@/data/portfolio";

interface Props {
  greeting: string;
  nightMode?: boolean;
}

export default function Hero({ greeting, nightMode = false }: Props) {
  const nameRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!nameRef.current) return;
    const r = nameRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    nameRef.current.style.backgroundPosition = `${x}% ${y}%`;
  }, []);

  return (
    <div className="scroll-runway section-hero">
      <div className="sticky-panel">
        <div className="section-inner" style={{ paddingTop: 0, paddingBottom: "6rem" }}>
          <section
            className="hero"
            aria-label="Introduction"
            style={{ position: "relative" }}
          >
            <FloatingBird />

            <div
              className="hero-layout"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "70vh",
              }}
            >
              <div
                className="hero-copy"
                style={{
                  paddingRight: 0,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="hero-line hero-line-1">
                  <h1
                    className="greeting"
                    aria-live="polite"
                    style={{
                      fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                      fontWeight: 500,
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {greeting ? (
                      <span className="greeting-phrase">
                        {greeting.split(" ").map((word, i) => (
                          <span
                            key={`${greeting}-${word}-${i}`}
                            className="greeting-word"
                            style={{ "--word-index": i } as React.CSSProperties}
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="greeting-placeholder" aria-hidden="true">&nbsp;</span>
                    )}
                  </h1>
                </div>

                <div className="hero-line hero-line-2">
                  <h1
                    className="hero-name"
                    onMouseMove={handleMouseMove}
                    style={{
                      fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                      fontWeight: 500,
                      margin: 0,
                      textAlign: "center",
                      animationDelay: "0.85s",
                    }}
                  >
                    {"I'm "}
                    <span ref={nameRef} className="gradient-name">
                      {siteConfig.name}.
                    </span>
                  </h1>
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    marginTop: "5.2rem",
                    display: "inline-flex",
                    opacity: 0.72,
                    animation: "scrollHintFade 0.8s ease 1.4s both",
                  }}
                >
                  <span className="scroll-hint-arrow" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}