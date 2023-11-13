import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__bside">
            <h2>Vodiy Parfum</h2>
          </div>
          <div className="footer__bside">
            <a href="instagram.com">instagram</a>
            <a href="facebook.com">facebook</a>
            <a href="linkindin.com">linkindin</a>
            <a href="telegram.com">telegram</a>
          </div>
        </div>
        <hr />
        <p className="footer-aspect">
          © 2023 <br /> Vodiy Parfume by Jamila
        </p>
      </div>
    </footer>
  );
};

export default Footer;
