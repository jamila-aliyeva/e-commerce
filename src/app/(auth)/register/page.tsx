import "./style.scss";
import RegisterForm from "@/components/form/registerForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Vodiy Parfum | Registratsiya",
  description: "Lorem ipusum ....",
};
const RegisterPage = () => {
  return (
    <section className="register">
      <div className="container">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
