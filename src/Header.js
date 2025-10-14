import { useEffect, useRef, useState } from "react";
import "./Header.css";
import logo from "./assets/logo-jasons-gallery.svg";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef(null);

  // Lock/unlock page scroll while menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (isMenuOpen) {
      root.classList.add("menu-open");
    } else {
      root.classList.remove("menu-open");
    }
    return () => root.classList.remove("menu-open");
  }, [isMenuOpen]);

  // Close on Esc
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Autofocus the search input when opening the menu
  useEffect(() => {
    if (isMenuOpen && inputRef.current) inputRef.current.focus();
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <button
            className="logo-button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={logo} alt="Logo" />
          </button>
        </div>
        <div className="header-right">
          <button
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            title="Open menu" >
                <i className="button-icon hamburger-icon bi bi-list"></i>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu-modal-overlay" /* OVERLAY */
        role="presentation" onClick={() => setIsMenuOpen(false)}>
          <div className="menu-modal" /* ENTIRE DIALOGUE PANEL */
          role="dialog" aria-modal="true" aria-label="Search and contact"
            onClick={(e) => e.stopPropagation()}>
            <div className="menu-modal-header" /* HEADER (CLOSE BTN) */>
              <button aria-label="Close menu" onClick={() => setIsMenuOpen(false)} title="Close" >
                        <i className="button-icon close-icon bi bi-x-lg"></i>
              </button>
            </div>
            <div className="menu-modal-content" /* SEARCH, RESET, EMAIL */>
              <div className="menu-modal-input-reset"/* SEARCH & RESET */>
                <div className="menu-modal-search-wrapper"/* SEARCH ICON & INPUT FIELD */>
                  <span>
                        <i className="button-icon search-icon bi bi-search"></i>
                  </span>
                  <input className="menu-modal-search-input" 
                    ref={inputRef} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <button /* RESET */
                        className={`button reset-button button-text ${searchTerm.length > 0 ? "visible" : "hidden"}`} onClick={() => setSearchTerm("")} >
                        Reset
                </button>
              </div>
              <a className="button-icon" /* EMAIL */
              href="mailto:jdullack@gmail.com" target="_blank" rel="noopener noreferrer" >
                <i class="email-icon button-icon bi bi-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;