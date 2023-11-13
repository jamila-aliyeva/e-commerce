"use client";

import CategoriesCard from "@/components/card/categoriesCard";
import useAllCategories from "@/store/all-categories";

import "./style.scss";
import AOS from "aos";
import { useEffect } from "react";

const AllProductsList = () => {
  useEffect(() => {
    AOS.init({ duration: "200" });
  }, []);
  const { loading, data: category = [], getData } = useAllCategories();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="categories__wrapper" data-aos="fade-up-right">
      {loading ? (
        <div>
          <h2 className="">loading...</h2>
        </div>
      ) : (
        Object.values(category).map((el) => (
          <CategoriesCard key={el._id} {...el} />
        ))
      )}
    </div>
  );
};

export default AllProductsList;
