"use client";

import useAllCategories from "@/store/user/all-categories";
import Image from "next/image";

import "./style.scss";
import AOS from "aos";
import { useEffect } from "react";
import Link from "next/link";

const AllProductsList = () => {
  useEffect(() => {
    AOS.init({ duration: 2100 });
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
        category.map((categoryItem) => (
          <div className="product__border" key={categoryItem._id || ""}>
            <div className="products__card">
              <div className="product__img">
                <Image
                  src={categoryItem.image?.url}
                  alt={categoryItem.name}
                  fill
                  objectFit="cover"
                />
              </div>
              <div className="category__content">
                <h3>{categoryItem.name}</h3>
                <div className="category_btn">
                  <Link href={`/category/${categoryItem._id || ""}`}>
                    <button
                      className="product__btn"
                      type="button"
                      data-ripple-light="true">
                      <h4>ko`proq</h4>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProductsList;
