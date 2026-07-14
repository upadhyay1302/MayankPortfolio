"use client";
import DitheredImage from "@/components/ui/DitheredImage";
import { siteConfig } from "@/data/portfolio";

interface Props {
  nightMode?: boolean;
}

export default function Footer({ nightMode = false }: Props) {
  return (
    <div className="scroll-runway runway-footer section-footer">
      <div className="sticky-panel">
        <footer className="footer" role="contentinfo">
          <div className="footer-inner">
            <span className="footer-text">
              © 2026 {siteConfig.name}. Built with care.
            </span>
            <div className="footer-links">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a href={`mailto:${siteConfig.email}`} className="footer-link">
                Email
              </a>
            </div>
            <div className="footer-location">
              <span className="footer-dot" aria-hidden="true" />
              Open to opportunities · {siteConfig.location}
            </div>
          </div>

          <div className="skyline-full-bleed" aria-hidden="true">
            <DitheredImage
              src="/toronto-skyline.png"
              className="city-skyline"
              nightMode={nightMode}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
