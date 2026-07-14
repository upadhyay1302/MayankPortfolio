"use client";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import DitheredImage from "@/components/ui/DitheredImage";
import { research } from "@/data/portfolio";
import type { ExperienceModal } from "@/data/portfolio";

interface Props {
  onProgress: (p: number) => void;
  revealed: boolean;
  nightMode?: boolean;
  onCardClick: (modal: ExperienceModal, section: string, trigger: HTMLElement) => void;
  showCursor?: (text: string) => void;
  hideCursor?: () => void;
}

export default function Research({ onProgress, revealed, nightMode = false, onCardClick, showCursor, hideCursor }: Props) {
  return (
    <div className="scroll-runway section-research" style={{ marginTop: "4.2rem" }} id="research">
      <div className="sticky-panel">
        <div className="section-inner">
          <section aria-label="Research" className="experience-section-wrap">
            <div className={`experience-lily${revealed ? " revealed" : ""}`} aria-hidden="true">
              <DitheredImage
                src="/buterfly.png"
                className="experience-lily-canvas"
                nightMode={nightMode}
                maxSize={720}
              />
            </div>

            <ScrollRevealText
              text="Research"
              className="section-title"
              startSize={140}
              endSize={52}
              onProgress={onProgress}
            />

            <div className={`section-content${revealed ? " revealed" : ""}`}>
              <div className="experience-grid" role="list">
                {research.map((item, i) => (
                  <div
                    key={i}
                    className="experience-card"
                    role="listitem"
                    tabIndex={0}
                    style={{ animationDelay: `${i * 60}ms` }}
                    onClick={(e) => onCardClick(item.modal, "research", e.currentTarget)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onCardClick(item.modal, "research", e.currentTarget);
                      }
                    }}
                    onMouseEnter={() => showCursor?.("View details")}
                    onMouseLeave={() => hideCursor?.()}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="experience-card-bg"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="experience-card-content">
                      <div className="experience-left">
                        <span className="experience-role">{item.role}</span>
                        <span className="experience-org">{item.company}</span>
                      </div>
                      <span className="experience-date">{item.date}</span>
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
