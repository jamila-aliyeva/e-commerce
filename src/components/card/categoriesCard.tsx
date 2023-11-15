import Image from "next/image";
import Link from "next/link";
import "./category.scss";

interface CategoriesCardProps {
  _id: string;
  image: {
    url: string;
  };
  name: string;
}

const CategoriesCard = ({ _id, image, name }: CategoriesCardProps) => {
  return (
    <div className="product__border" key={_id}>
      <div className="products__card">
        <div className="product__img">
          <Image src={image?.url} alt={name} fill objectFit="cover" />
        </div>
        <div className="category__content">
          <h3>{name}</h3>

          <div className="category_btn">
            <Link href={`/category/${_id}`}>
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
  );
};

export default CategoriesCard;
