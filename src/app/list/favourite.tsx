"use client";
import useFavaurite from "@/store/user/favaurite";
import FavauriteType from "../../types/index";
import Image from "next/image";

import "./style.scss";

const FavouriteList = () => {
  const { cart, removeLiked } = useFavaurite();

  let newCart: (FavauriteType | null)[] = cart.map(
    (product: FavauriteType) => ({
      ...product,
    })
  );
  return (
    <div className="cart__row">
      {newCart?.map((product) => (
        <div key={product?.id || ""} className="fav__card">
          <div className="fav__image">
            <Image
              src={
                typeof product?.image === "string"
                  ? product?.image
                  : product?.image?.url ||
                    "https://www.junglescout.com/wp-content/uploads/2021/01/product-photo-water-bottle-hero.png"
              }
              alt={product?.title || ""}
              fill
              objectFit="cover"
            />
          </div>
          <div className="fav__content">
            <h3>Nomi: {product?.title}</h3>
            <p>{product?.description}</p>
            <p>Narxi: {product?.price} $</p>
          </div>
          <div className="btn__fav">
            <button
              className="fav__btn"
              onClick={() => removeLiked(product?.id || "")}>
              O`chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteList;
