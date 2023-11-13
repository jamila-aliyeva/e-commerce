import "./style.scss";
import RegisterForm from "@/components/form/registerForm";

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
