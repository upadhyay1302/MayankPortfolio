"use client";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data/portfolio";

interface Props {
  onProgress: (p: number) => void;
  revealed: boolean;
}

export default function About({ onProgress, revealed }: Props) {
  const { about } = siteConfig;

  return (
    <div className="scroll-runway section-about" id="about">
      <div className="sticky-panel">
        <div className="section-inner">
          <section aria-label="About me">
            <ScrollRevealText
              text="About"
              className="section-title"
              startSize={140}
              endSize={52}
              onProgress={onProgress}
            />
            <div className={`section-content${revealed ? " revealed" : ""}`}>
              <div className="about-container">
                <div className="about-text">
                  {about.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="body-text"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                  <p className="about-monthly-quote">
                    <span className="about-monthly-quote-label">
                      {about.quote.label}:
                    </span>{" "}
                    &ldquo;{about.quote.text}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}