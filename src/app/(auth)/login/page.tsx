import LoginForm from "@/components/form/loginForm";
import "./style.scss";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Vodiy Parfum | Kirish",
  description: "Lorem ipusum ....",
};

const loginPage = () => {
  return (
    <section className="login-page">
      <div className="container">
        <LoginForm />
      </div>
    </section>
  );
};

export default loginPage;
