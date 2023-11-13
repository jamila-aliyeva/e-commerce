"use client";

import { useEffect, useState } from "react";
import { Cookies } from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavLink from "@/components/shares/navlink";

import "./style.scss";
import { Montserrat } from "next/font/google";
import useAuth from "@/store/auth";
import { TOKEN, USER_DATA_STATE } from "@/constants";
import { Badge } from "@mui/material";
import useCart from "@/store/cards";
const montserrat = Montserrat({ subsets: ["latin"] });

function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, setIsAuthenticated } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { cart } = useCart();

  useEffect(() => {
    document.body.classList.add("hiddin");
    if (menuOpen) {
      document.body.classList.add("hiddin");
    } else {
      document.body.classList.remove("hiddin");
    }
  }, [menuOpen]);

  const logout = () => {
    if (localStorage && Cookies) {
      localStorage.removeItem(USER_DATA_STATE);
      Cookies.remove(TOKEN);
    }

    if (user !== null) {
      setIsAuthenticated(user);
    }

    router.push("/");
  };

  return (
    <header className={montserrat.className}>
      <nav className="container">
        <div className="logo">
          <Link href={"/"}>
            <h1>Vodiy Parfum</h1>
          </Link>
        </div>

        <div className={`navigation ${menuOpen ? "open" : "hide"}`}>
          <div className="action">
            {/* <NavLink onClick={() => setMenuOpen(false)} href={"/"}>
              Home
            </NavLink> */}
            <NavLink onClick={() => setMenuOpen(false)} href={"/allproducts"}>
              Mahsulotlar
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} href={"/cart"}>
              <Badge badgeContent={cart.length} color="primary">
                Savatcha
              </Badge>
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} href={"/favourite"}>
              Sevimlilar
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} href={"/about"}>
              Haqida
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} href={"/contact"}>
              Aloqa
            </NavLink>
            {isAuthenticated ? (
              <NavLink onClick={() => setMenuOpen(false)} href={"/account"}>
                Account
              </NavLink>
            ) : (
              <NavLink onClick={() => setMenuOpen(false)} href={"/register"}>
                Registratsiya
              </NavLink>
            )}
            {isAuthenticated ? (
              <button className="logout_btn" onClick={logout}>
                Chiqish
              </button>
            ) : (
              <NavLink onClick={() => setMenuOpen(false)} href={"/login"}>
                Kirish
              </NavLink>
            )}
          </div>
        </div>
        <div className={menuOpen ? `open-menu menu` : `menu`}>
          <button className="menu-toggle" onClick={toggleMenu}>
            <Image
              width={50}
              height={50}
              src={
                menuOpen
                  ? `https://static.thenounproject.com/png/4984268-200.png`
                  : `https://www.svgrepo.com/show/315606/menu-left.svg`
              }
              alt="nav"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
