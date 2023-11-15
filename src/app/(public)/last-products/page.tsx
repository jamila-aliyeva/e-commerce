"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import "./style.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import useLatestProducts from "@/store/user/lastProducts";
import useCart from "@/store/user/cards";
import Slider from "react-slick";
import useFavaurite from "@/store/user/favaurite";
import Loadingpage from "@/app/loading";

const LastProducts = () => {
  const { cart: favCart, Liked } = useFavaurite();
  const {
    loading,
    data: latestProducts,
    getData: getLatestProducts,
  } = useLatestProducts();

  const { addToCart, cart } = useCart();

  const isProductInCart = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const inFavaurite = (productId: string) => {
    return favCart.some((favCartProduct) => favCartProduct.id === productId);
  };

  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="product__title">
        <h2>So`ngi mahsulotlarimiz</h2>
      </div>
      <Slider {...settings}>
        <div className="hero__aside" data-aos="zoom-in">
          <h1>
            Bizning <br /> So`ngi Mahsulotlarimiz
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            praesentium neque, soluta quis quisquam aperiam eius officia numquam
            commodi hic molestiae quod ad officiis, veniam, eveniet repellendus.
          </p>
          <Link href="/allproducts">
            <button>Barchasi 👉</button>
          </Link>
        </div>

        {latestProducts?.map((product) => (
          <div className="last_products" key={product?._id}>
            <div className="last__img">
              <Image
                src={product?.image.url}
                alt={product?.title}
                fill
                objectFit="cover"
              />
            </div>
            <div className="last__content">
              <h3>{product?.title}</h3>
              <p>Miqdori: {product?.quantity || "Mavjud emas"}</p>
              <p>Narxi: {product?.price}  sum</p>
            </div>
            <div className="button__wrapper">
              <button
                onClick={() =>
                  addToCart(
                    product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price
                  )
                }
                className={
                  isProductInCart(product?._id) ? "in-cart" : "product__btn"
                }>
                {isProductInCart(product?._id) ? "Qo'shilgan" : "Qo'shish"}
              </button>
              <button
                onClick={() =>
                  Liked(
                    product?._id,
                    product?.image.url,
                    product?.title,
                    product?.description,
                    product?.price
                  )
                }
                className={`fav-cart ${
                  inFavaurite(product?._id) ? "in-fav" : ""
                }`}>
                {inFavaurite(product?._id) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIconOutlined />
                )}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default LastProducts;
