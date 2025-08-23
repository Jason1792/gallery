import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">          
          <button className="button button-text" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</button>
        </div>
        <div className="footer-right"></div>
      </div>
    </footer>
  );
}
export default Footer;