"use client";

import request from "@/server";
import useAuth from "@/store/auth";
import ROLES from "@/types/roles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = async () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = new FormData(e.currentTarget);
      const userData = {
        username: data.get("username"),
        password: data.get("password"),
      };

      const {
        data: { accesstoken, user },
      } = await request.post(`auth/login`, userData);
      toast.success("Muaffaqiyatli kirish!");
      setIsAuthenticated(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("token", accesstoken);
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;

      if (user.role === ROLES.ADMIN) {
        router.push("/admin");
      } else {
        router.push("/");
      }
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
                Hali ham o`zingizni sahifangiz yo`qmi? O`z sahifangizni
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
