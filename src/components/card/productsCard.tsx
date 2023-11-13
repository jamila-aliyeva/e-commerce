import Image from "next/image";
import Link from "next/link";

import "./products.scss";
import useCart from "@/store/cards";

const ProductsCard = ({
  sold,
  price,
  quantity,
  _id,
  title,
  description,
  image,
}) => {
  const { addToCart } = useCart();
  return (
    <div className="product__border" key={_id}>
      <div className="products__card">
        <div className="product__img">
          <Image src={image.url} alt={title} fill objectFit="cover" />
        </div>
        <Link href={`/allproducts/${_id}`} className="product__content">
          <h3>{title}</h3>
          <h4>Sotildi:{sold}</h4>
          <p>{description}</p>
          <p>Miqdori: {quantity}</p>
          <p>Narxi: {price} sum</p>
        </Link>
        <div className="button__wrapper">
          <button
            onClick={() =>
              addToCart(
                _id,
                image.url,
                title,
                description,
                sold,
                quantity,
                price
              )
            }
            className="product__btn">
            cartga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
