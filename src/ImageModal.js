import React, { useEffect } from "react";
import "./ImageModal.css";
const ImageModal = ({ imageSrc, headline, date, location, description, filename, keywords, onClose, onNext, onPrev }) => {
useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";
    // Cleanup: re-enable scroll on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  
  if (!imageSrc) return null;
return (
<div className="modal-overlay">
        <div className="modal-content">
                <div className="modal-image-container">
                        <img src={imageSrc} alt={headline} />
                </div>
                <div className="modal-text-and-nav">
                        <div className="modal-nav">
                                <div className="modal-back-and-forward">
                                        <button className="modal-nav-button" onClick={onPrev}>Prev</button>
                                        <button className="modal-nav-button" onClick={onNext}>Next</button>
                                </div>
                                <div className="modal-close">
                                        <button className="modal-nav-button" onClick={onClose}>Close</button>
                                </div>
                        </div>
                        <div className="modal-text">
                                <h3 className="modal-headline">{headline}</h3>
                                <p className="modal-date">{date}</p>
                                <p className="modal-location">{location}</p>
                                <p className="modal-description">{description}</p>
                                <p className="modal-filename">{filename}</p>
                                <p className="modal-keywords">{keywords}</p>
                        </div>
                </div>
        </div>
</div>
);
};
export default ImageModal;
