"use client";
import type { ExperienceModal } from "@/data/portfolio";

interface Props {
  activeModal: ExperienceModal | null;
  modalSection: string;
  closeModal: () => void;
  drawerCloseRef: React.RefObject<HTMLButtonElement | null>;
  drawerImageReady: boolean;
  drawerBodyReady: boolean;
}

export default function Drawer({
  activeModal,
  modalSection,
  closeModal,
  drawerCloseRef,
  drawerImageReady,
  drawerBodyReady,
}: Props) {
  return (
    <>
      <div
        className={`drawer-backdrop${activeModal ? " drawer-open" : ""}`}
        onClick={closeModal}
        aria-hidden="true"
      />
      <div
        className={`drawer${activeModal ? " drawer-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-frame" aria-hidden="true" />
        <div className="drawer-header">
          <span className="drawer-tab">{modalSection}</span>
          <button
            ref={drawerCloseRef}
            className="modal-close"
            onClick={closeModal}
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {activeModal && (
          <div className="drawer-body">
            {activeModal.image && (
              <img
                src={activeModal.image}
                alt=""
                className={`modal-image ${drawerImageReady ? "ready" : "pending"}`}
                loading="eager"
                decoding="async"
              />
            )}
            <h2 className="modal-title" id="drawer-title">
              {activeModal.title}
            </h2>
            <p className="modal-subtitle">{activeModal.subtitle}</p>

            {drawerBodyReady ? (
              <p
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: activeModal.body }}
              />
            ) : (
              <div className="drawer-body-placeholder" aria-hidden="true" />
            )}

            {activeModal.links.length > 0 && (
              <div className="modal-links">
                {activeModal.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    className="modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                    <span className="dotted-arrow dotted-arrow-up-right" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}