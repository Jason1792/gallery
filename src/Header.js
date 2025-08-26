import "./Header.css";
import logo from "./assets/logo-jasons-gallery.svg";
import logoTwoLines from "./assets/logo-jasons-gallery-two-lines.svg";
import magnifyingGlass from "./assets/magnifying-glass.svg";
const Header = ({ searchTerm, setSearchTerm }) => {
return (
<header className="header">
        <div className="header-inner">
                <div className="header-left">
                        <button className="logo-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                <picture>
    <source media="(max-width: 600px)" srcSet={logoTwoLines} type="image/svg+xml" />
    <img src={logo} alt="Logo" />
  </picture>                       
                        </button>
                </div>
                <div className="header-right">
                        <div className="input-and-reset">
                                <div className="search-wrapper">
                                        <span className="search-icon">
                                                <img src={magnifyingGlass} alt="" />
                                        </span>     
                                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
                                </div>
                                <button onClick={() => setSearchTerm('')} className="button reset-button button-text">Reset</button>        
                        </div>
                        <a className="button button-text email-button" href="mailto:jdullack@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
                </div>
        </div>
</header>
);
};
export default Header;