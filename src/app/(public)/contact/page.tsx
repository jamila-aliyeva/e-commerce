import { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "E-Commerce | Contact",
  description: "You can contact with us in this page",
};
const ContactPage = () => {
  return (
    <div className="container">
      <div className="wrapper" style={{ marginTop: "100px" }}>
        <form className="form">
          <h1>
            Biz bilan bog`laning va taklif, shikoyatlaringizni yozib qoldiring!
          </h1>
          <div className="email block">
            <label htmlFor="frm-email">Email</label>
            <input
              id="frm-email"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="block phone">
            <label htmlFor="frm-phone">Telefon</label>
            <input
              id="frm-phone"
              type="text"
              name="phone"
              autoComplete="tel"
              required
            />
          </div>
          <div className="name block">
            <div>
              <label htmlFor="frm-first">Famiyila</label>
              <input
                id="frm-first"
                type="text"
                name="first"
                autoComplete="given-name"
                required
              />
            </div>
            <div>
              <label htmlFor="frm-last">Ism</label>
              <input
                id="frm-last"
                type="text"
                name="last"
                autoComplete="family-name"
                required
              />
            </div>
          </div>
          <div className="message block">
            <label htmlFor="frm-message">Xabar</label>
            <textarea id="frm-message" rows="6" name="message"></textarea>
          </div>
          <div className="button block">
            <button type="submit">Yuborish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
