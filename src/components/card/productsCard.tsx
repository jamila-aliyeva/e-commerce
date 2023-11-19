import Image from "next/image";
import "./products.scss";
import useCart from "@/store/user/cards";
import useFavaurite from "@/store/user/favaurite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIconOutlined from "@mui/icons-material/FavoriteBorderOutlined";

interface ProductsProps {
  _id: string;
  image: {
    url: string;
  };
  title: string;
  description: string;
  price: number;
  sold: number;
  quantity: number;
}

const ProductsCard = ({
  sold,
  price,
  quantity,
  _id,
  title,
  description,
  image,
}: ProductsProps) => {
  const { cart: favCart, Liked } = useFavaurite();
  const { addToCart, cart } = useCart();

  const isProductInCart = (productId: string) => {
    return cart.some((cartProduct) => cartProduct.id === productId);
  };

  const inFavaurite = (productId: string) => {
    return favCart.some((favCartProduct) => favCartProduct.id === productId);
  };

  return (
    <div className="product__border" key={_id}>
      <div className="products__card">
        <div className="product__img">
          <Image
            src={image.url}
            alt={title}
            fill
            objectFit="cover"
          />
        </div>
        <div className="product__content">
          <h3>{title}</h3>
          <h4>Sotildi:{sold}</h4>
          <p>{description}</p>
          <p>Miqdori: {quantity}</p>
          <p>Narxi: {price} sum</p>
        </div>
        <div className="button__wrapper">
          <button
            onClick={() => addToCart(_id, image.url, title, description, price)}
            className={isProductInCart(_id) ? "in-cart" : "product__btn"}>
            {isProductInCart(_id) ? "Qo'shilgan" : "Qo'shish"}
          </button>
          <button
            onClick={() => Liked(_id, image.url, title, description, price)}
            className={`fav-cart ${inFavaurite(_id) ? "in-fav" : ""}`}>
            {inFavaurite(_id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIconOutlined />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
