import LoginForm from "@/components/form/loginForm";
import "./style.scss";

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
