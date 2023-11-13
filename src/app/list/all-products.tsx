"use client";

import ProductsCard from "@/components/card/productsCard";
import { useEffect, useState } from "react";

import "./style.scss";
import AllProductsType from "@/types/all-products";
import request from "@/server";
import { LIMIT } from "@/constants";
import { Pagination } from "@mui/material";

interface Types {
  limit: number;
  search: string;
  page: number;
  category?: string;
}

const AllproductsList = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);

  const controlPages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await request.get("category");
      setCategories(categories);
    };
    getCategories();

    const getProducts = async () => {
      const params: Types = {
        page,
        limit: LIMIT,
        search,
      };
      if (category) {
        params.category = category;
      }
      const {
        data: { products, total },
      } = await request.get("product", { params });
      setProducts(products);
      setTotal(total);
    };
    getProducts();
  }, [setCategories, setProducts, page, search, category]);

  const Sorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <>
      <select onChange={(e) => Sorting(e)} className="products__sort">
        <option value="">All</option>
        {categories?.map((category: { _id: string; name: string }) => (
          <option key={category?._id} value={category?._id}>
            {category?.name}
          </option>
        ))}
      </select>
      <div className="products__search">
        <input
          type="text"
          placeholder="searching..."
          value={search}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      <div
        className="categories__wrapper"
        style={{ marginTop: "70px" }}
        data-aos="fade-down-left">
        {products?.map((product: AllProductsType) => (
          <ProductsCard key={product._id} {...product} />
        ))}
      </div>
      <div className="pagination">
        {total / LIMIT > 1 ? (
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(event, value) => controlPages(event, value)}
            boundaryCount={2}
          />
        ) : null}
      </div>
    </>
  );
};

export default AllproductsList;
