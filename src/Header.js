import "./Header.css";
import logo from "./assets/logo-jasons-reaction.svg";
const Header = ({ searchTerm, setSearchTerm }) => {
return (
<header className="header">
        <div className="header-inner">
                <div className="header-left">
                        <button className="logo-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                <img src={logo} alt="Jason's Reaction Logo" />
                        </button>
                </div>
                <div className="header-right">
                        <div className="search-container">
                                <input type="text" placeholder=" Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
                        </div>
                        <button onClick={() => setSearchTerm('')} className="button reset-button button-text">Reset</button>        
                        <a className="button button-text" href="mailto:jdullack@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
                </div>
        </div>
</header>
);
};
export default Header;