// import { Metadata } from "next";

"use client";
import LastProducts from "./last-products/page";
import AllProductsList from "../list/all-categories";

import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: "2600" });
  }, []);

  return (
    <>
      <section className="hero__section">
        <div className="container">
          <div className="hero-wrap" >
            <LastProducts />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <h2 className="all__categories">Mahsulotlar Kategoriyasi</h2>
          <div>
            <AllProductsList />
          </div>
        </div>
      </section>
    </>
  );
}
