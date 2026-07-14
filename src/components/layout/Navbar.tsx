"use client";
import { useState } from "react";
import { siteConfig } from "@/data/portfolio";

interface Props {
  activeSection: string;
  progressFillRef: React.RefObject<HTMLSpanElement | null>;
  scrollTo: (id: string) => void;
}

export default function Navbar({ activeSection, progressFillRef, scrollTo }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Research", id: "research" },
    { label: "Projects", id: "projects" },
    { label: "Résumé", href: siteConfig.resumePdf },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-bar">
        <div className="navbar-inner">
          <a
            href="#top"
            className="navbar-name"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            {siteConfig.navLogoText}
          </a>

          <div className="navbar-links" role="list">
            {navLinks.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  role="listitem"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-link"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  role="listitem"
                  className={`navbar-link${activeSection === item.id ? " active" : ""}`}
                  onClick={() => handleScrollTo(item.id!)}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      <div className="navbar-feather" aria-hidden="true">
        <div className="navbar-feather-inner" />
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressFillRef} className="scroll-progress-fill" />
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-grid">
          {navLinks.map((item) =>
            item.href ? (
              <a
                key={item.label}
                role="menuitem"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                role="menuitem"
                className="mobile-menu-link"
                onClick={() => handleScrollTo(item.id!)}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
