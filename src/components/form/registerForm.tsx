"use client";

import request from "@/server";
import useAuth from "@/store/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { setIsAuthenticated } = useAuth();
  const [isloading, setisLoading] = useState(false);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setisLoading(true);
      const userData = {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        phoneNumber: e.currentTarget.phoneNumber.value,
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      };
      const {
        data: { accesstoken, user },
      } = await request.post(`auth/register`, userData);
      console.log(user);
      toast.success("Muaffaqiyatli registratsiya!");
      setIsAuthenticated(user);
      window?.localStorage?.setItem("user", JSON.stringify(user));
      window?.localStorage?.setItem("token", accesstoken);

      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } catch (err) {
      toast.error("Bu foydalanuvchi mavjud))");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="form-wrap">
      <div className="form-container" style={{ marginTop: "30px" }}>
        <h1
          style={{
            textAlign: "center",
          }}>
          Registratsiya
        </h1>
        <div>
          <form onSubmit={register}>
            <input type="text" name="firstName" placeholder="Familiya" />
            <input type="text" name="lastName" placeholder="Ism" />
            <input type="text" name="username" placeholder="Foydalanuvchi nomi" />
            <input type="text" name="phoneNumber" placeholder="+998 91 342 13 45" />
            <input type="password" name="password" placeholder="Password" />
            <button>Registratsiya</button>
          </form>
        </div>
      </div>
      <div className="toggle-container">
        <div className="toggle-panel toggle-right">
          <h2>Xush kelibsiz!</h2>
          <p>Registratsiya orqali saytga kirishing mumkin va oz hisobingizni yarating </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
