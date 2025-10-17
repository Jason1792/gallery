import React, { useEffect, useRef, useState } from "react";
import "./ImageModal.css";

const ImageModal = ({
  imageSrc, imageSmall, imageMedium, imageLarge, headline, dateLocation, date, location, description, filename, keywords, onClose, onNext, onPrev }) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

const lastXRef = useRef(null);

const [startX, setStartX] = useState(null);
const [startY, setStartY] = useState(null);
const [isSwiping, setIsSwiping] = useState(false);

  if (!imageSrc && !imageLarge && !imageMedium && !imageSmall) return null;


const isTouchBreakpoint = typeof window !== "undefined" ? window.innerWidth <= 1024 : true;
const SWIPE_THRESHOLD = 50; // px required to trigger
const MAX_VERTICAL_DRIFT = 30; // ignore if vertical motion is large

const small  = imageSmall  ? encodeURI(imageSmall)  : imageSrc;
const medium = imageMedium ? encodeURI(imageMedium) : imageSrc;
const large  = imageLarge  ? encodeURI(imageLarge)  : imageSrc;

const onTouchStart = (e) => {
  if (!isTouchBreakpoint) return;
  const t = e.touches[0];
  setStartX(t.clientX);
  setStartY(t.clientY);
  lastXRef.current = t.clientX;
  setIsSwiping(false);
};

const onTouchMove = (e) => {
  if (!isTouchBreakpoint || startX === null || startY === null) return;
  const t = e.touches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  lastXRef.current = t.clientX;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dy) < MAX_VERTICAL_DRIFT) {
    setIsSwiping(true);
    e.preventDefault();
  }
};


const onTouchEnd = () => {
  if (!isTouchBreakpoint || startX === null || lastXRef.current === null) {
    setStartX(null); setStartY(null); setIsSwiping(false);
    return;
  }
  const dx = lastXRef.current - startX;

  if (isSwiping && Math.abs(dx) >= SWIPE_THRESHOLD) {
    if (dx < 0) {
      // swipe left → NEXT
      onNext?.();
    } else {
      // swipe right → PREV
      onPrev?.();
    }
  }

  setStartX(null);
  setStartY(null);
  setIsSwiping(false);
  lastXRef.current = null;
};


  return (
    <div className="image-modal-overlay">
      <div className="image-modal-content">
        <div className="image-modal-nav-and-text">
          <div className="image-modal-nav">
            <div className="image-modal-close">
              <button className="button image-modal-nav-button" onClick={onClose}>
                <i className="close-icon bi bi-x-lg"></i>
              </button>
            </div>
            <div className="image-modal-back-and-forward">
              <button className="button image-modal-nav-button" onClick={onPrev}>
                <i className="left-icon bi bi-chevron-left"
                  aria-hidden="true"
                />
              </button>
              <button className="button image-modal-nav-button" onClick={onNext}>
                <i
                  className="right-icon bi bi-chevron-right"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <div className="image-modal-text">
            <h3 className="image-modal-headline">{headline}</h3>
            {dateLocation ? (
                          <p className="image-modal-date-location">{dateLocation}</p>
                        ) : (
                        <>
                        <p className="image-modal-date">{date || ""}</p>
                        <p className="image-modal-location">{location || ""}</p>
                        </>
                        )}
            <p className="image-modal-description">{description}</p>
            <p className="image-modal-filename">{filename}</p>
            <p className="image-modal-keywords">{keywords}</p>
          </div>
        </div>

        <div className="image-modal-image-container"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}>
          <picture>
            {/* Mobile */}
            <source media="(max-width: 600px)" srcSet={small} />
            {/* Tablet */}
            <source media="(max-width: 1024px)" srcSet={medium} />
            {/* Desktop fallback */}
            <img
              src={large}
              alt={headline}
              onLoad={(e) =>
                console.log("Modal image currentSrc:", e.currentTarget.currentSrc)
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/Image Not Available.png";
              }}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
