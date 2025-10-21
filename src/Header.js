import { useEffect, useRef, useState } from "react";
import "./Header.css";
import logo from "./assets/logo.svg";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef(null);

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
          <button className="button menu-toggle-button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-haspopup="dialog"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title={isMenuOpen ? "Close menu" : "Open menu"}
                >
                <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
        </div>
      </div>
      {isMenuOpen && (
  <div className="menu-outer" /* none | grey */
  role="region" aria-label="Search and contact">
    <div className="menu-inner" /* none | yella */>        <div className="menu-modal-input-reset">
          <div className="menu-modal-search-wrapper">
            <span>
              <i className="search-icon bi bi-search"></i>
            </span>
            <input className="menu-modal-search-input"
              ref={inputRef} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className={`button reset-button ${searchTerm.length > 0 ? "visible" : "hidden"}`}
            onClick={() => setSearchTerm("")}>
            <p>Clear</p>
          </button>
        </div>
        <div className="email-button-wrapper">
          <a className="button email-button"
            href="mailto:jdullack@gmail.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-envelope"></i>
          </a></div></div></div>)}</header>);};
export default Header;