import { useCallback, useEffect } from "react";
import type { Photos } from "../../types/photo";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotoModalProps {
  photo: Photos;
  onClose: () => void;
}

export default function Modal({ onClose, photo }: PhotoModalProps) {
  const handleBackDropClick = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    function handleEscKey(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackDropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        {<PhotosGalleryItem photo={photo} />}
      </div>
    </div>,
    document.body
  );
}
