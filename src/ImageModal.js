import React, { useEffect } from "react";
import "./ImageModal.css";
import close from "./assets/close.svg";
import backForward from "./assets/back-forward.svg";
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
                <div className="modal-nav-and-text">
                        <div className="modal-nav">
                                <div className="modal-close">
                                        <button className="modal-nav-button" onClick={onClose}><img className="modal-close-icon" src={close} alt="Close" /></button>
                                </div>
                                <div className="modal-back-and-forward">
                                        <button className="modal-nav-button" onClick={onPrev}><img className="modal-back-icon" src={backForward} alt="Back" /></button>
                                        <button className="modal-nav-button" onClick={onNext}><img className="modal-forward-icon" src={backForward} alt="Next" /></button>
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
                <div className="modal-image-container">
                        <img src={imageSrc} alt={headline} />
                </div>
        </div>
</div>
);
};
export default ImageModal;
