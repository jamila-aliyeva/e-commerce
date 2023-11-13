"use client";

import request from "@/server";
import useAuth from "@/store/auth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = async () => {
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const userData = {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
      };
      const {
        data: { accesstoken, user },
      } = await request.post(`auth/login`, userData);
      console.log(user);
      toast.success("muaffaqiyatli kirish!");
      setIsAuthenticated(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("token", accesstoken);

      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } catch (err) {
      toast.error("Foydalanuvchi yoki password xato");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="login-page">
      <div className="container">
        <div className="form-wrap">
          <div className="form-container">
            <form onSubmit={login}>
              <h1>Saytga kirish</h1>
              <input
                type="text"
                name="username"
                placeholder="foydalanuvchi nomi"
              />
              <input type="password" name="password" placeholder="password" />
              <button type="submit" className="sign-in">
                Kirish
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle-panel toggle-right">
              <h2>Xush kelibsiz!</h2>
              <p>
                Hali ham o'zingizni sahifangiz yo'qmi? O'z sahifangizni
                yaratish👇
              </p>
              <Link href="/register">
                <button className="hidden" id="register">
                  Registratsiya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
