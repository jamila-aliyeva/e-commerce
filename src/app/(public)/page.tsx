import { Metadata } from "next";

import LastProducts from "./last-products/page";
import AllProductsList from "../list/all-categories";

import "./style.scss";
import CategoriesCard from "@/components/card/categoriesCard";

export const metadata: Metadata = {
  title: "Vodiy Parfum | Bosh sahifa",
  description: "Lorem ipusum ....",
};

export default function Home() {
  return (
    <>
      <section className="hero__section">
        <div className="container">
          <div className="hero-wrap">
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
