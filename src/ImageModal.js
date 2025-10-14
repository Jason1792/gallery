import React, { useEffect } from "react";
import "./ImageModal.css";

const ImageModal = ({
  imageSrc, imageSmall, imageMedium, imageLarge, headline, date, location, description, filename, keywords, onClose, onNext, onPrev }) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!imageSrc && !imageLarge && !imageMedium && !imageSmall) return null;

  // Fallbacks in case one of the sizes isn't provided. Also solves spaces-in-filename issue
const small  = imageSmall  ? encodeURI(imageSmall)  : imageSrc;
const medium = imageMedium ? encodeURI(imageMedium) : imageSrc;
const large  = imageLarge  ? encodeURI(imageLarge)  : imageSrc;

  return (
    <div className="image-modal-overlay">
      <div className="image-modal-content">
        <div className="image-modal-nav-and-text">
          <div className="image-modal-nav">
            <div className="image-modal-close">
              <button className="image-modal-nav-button" onClick={onClose}>

                <i className="button-icon close-icon bi bi-x-lg"></i>
              </button>
            </div>
            <div className="image-modal-back-and-forward">
              <button className="image-modal-nav-button" onClick={onPrev}>
                <i
                  className="button-icon left-icon bi bi-chevron-left accordion-button-icon"
                  aria-hidden="true"
                />
              </button>
              <button className="image-modal-nav-button" onClick={onNext}>
                <i
                  className="button-icon right-icon bi bi-chevron-right accordion-button-icon"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="image-modal-text">
            <h3 className="image-modal-headline">{headline}</h3>
            <p className="image-modal-date">{date}</p>
            <p className="image-modal-location">{location}</p>
            <p className="image-modal-description">{description}</p>
            <p className="image-modal-filename">{filename}</p>
            <p className="image-modal-keywords">{keywords}</p>
          </div>
        </div>

        <div className="image-modal-image-container">
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
