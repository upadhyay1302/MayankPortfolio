"use client";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import { projects } from "@/data/portfolio";
import type { ExperienceModal } from "@/data/portfolio";

interface Props {
  onProgress: (p: number) => void;
  revealed: boolean;
  nightMode?: boolean;
  onCardClick: (modal: ExperienceModal, section: string, trigger: HTMLElement) => void;
  showCursor?: (text: string) => void;
  hideCursor?: () => void;
}

export default function Projects({ onProgress, revealed, nightMode = false, onCardClick, showCursor, hideCursor }: Props) {
  return (
    <div className="scroll-runway section-projects" style={{ marginTop: "4.2rem" }} id="projects">
      <div className="sticky-panel">
        <div className="section-inner">
          <section aria-label="Projects">
            <ScrollRevealText
              text="Projects"
              className="section-title"
              startSize={140}
              endSize={52}
              onProgress={onProgress}
            />

            <div className={`section-content${revealed ? " revealed" : ""}`}>
              <div className="project-grid-wrap">
                <div className="project-grid" role="list">
                  {projects.map((proj, i) => (
                    <div
                      key={i}
                      className="project-card"
                      role="listitem"
                      tabIndex={0}
                      style={{ animationDelay: `${i * 50}ms` }}
                      onClick={(e) => onCardClick(proj.modal, "projects", e.currentTarget)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onCardClick(proj.modal, "projects", e.currentTarget);
                        }
                      }}
                      onMouseEnter={() => showCursor?.("View project")}
                      onMouseLeave={() => hideCursor?.()}
                    >
                      {proj.image && (
                        <img
                          src={proj.image}
                          alt=""
                          className="project-card-bg"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="project-card-content">
                        <span className="project-tag">{proj.award}</span>
                        <h3 className="project-name">{proj.title}</h3>
                        <p className="project-tech">{proj.stack}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}