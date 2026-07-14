"use client";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import DitheredImage from "@/components/ui/DitheredImage";
import { experience } from "@/data/portfolio";
import type { ExperienceModal } from "@/data/portfolio";

interface Props {
  onProgress: (p: number) => void;
  revealed: boolean;
  nightMode?: boolean;
  onCardClick: (modal: ExperienceModal, section: string, trigger: HTMLElement) => void;
  showCursor?: (text: string) => void;
  hideCursor?: () => void;
}

export default function Experience({ onProgress, revealed, nightMode = false, onCardClick, showCursor, hideCursor }: Props) {
  return (
    <div className="scroll-runway section-experience" id="experience">
      <div className="sticky-panel">
        <div className="section-inner">
          <section aria-label="Work experience" className="experience-section-wrap">
            <div className={`experience-lily${revealed ? " revealed" : ""}`} aria-hidden="true">
              <DitheredImage
                src="/lily.png"
                className="experience-lily-canvas"
                nightMode={nightMode}
                maxSize={720}
              />
            </div>

            <ScrollRevealText
              text="Experience"
              className="section-title"
              startSize={140}
              endSize={52}
              onProgress={onProgress}
            />

            <div className={`section-content${revealed ? " revealed" : ""}`}>
              <div className="experience-grid" role="list">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="experience-card"
                    role="listitem"
                    tabIndex={0}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={(e) => onCardClick(exp.modal, "experience", e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onCardClick(exp.modal, "experience", e.currentTarget);
                      }
                    }}
                    onMouseEnter={() => showCursor?.("View details")}
                    onMouseLeave={() => hideCursor?.()}
                  >
                    <img
                      src={exp.image}
                      alt=""
                      className="experience-card-bg"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="experience-card-content">
                      <div className="experience-left">
                        <span className="experience-role">{exp.role}</span>
                        <span className="experience-org">{exp.company}</span>
                      </div>
                      <span className="experience-date">{exp.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
