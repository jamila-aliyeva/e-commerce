import AllCategoryType from "@/types/all-categories";
import Image from "next/image";
import Link from "next/link";
import "./category.scss";

const CategoriesCard = ({ _id, image, name }) => {
  return (
    <div className="product__border" key={_id}>
      <div className="products__card">
        <div className="product__img">
          <Image src={image.url} alt={name} fill objectFit="cover" />
        </div>
        <div className="product__content">{/* <h3>{name}</h3> */}</div>

        <div className="button__wrapper">
          <Link href={`/category/${_id}`}>
            <button
              className="product__btn"
              type="button"
              data-ripple-light="true">
              <h3>see more</h3>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
