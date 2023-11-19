import AllCategoryType from "@/types/all-categories";
import CategoriesCard from "../card/categoriesCard";
import "./style.scss";
import Image from "next/image";

interface ProductsRowProps {
  loading?: boolean;
  products: AllCategoryType[];
}

const ProductsRow = ({ loading, products }: ProductsRowProps) => {
  return (
    <div className="container">
      <div className="products__wrapper">
        {loading ? (
          <div>loading...</div>
        ) : (
          products.map((product) => (
            <div className="product__border" key={product?._id}>
              <div className="products__card">
                <div className="product__img">
                  <Image
                    src={product?.image?.url}
                    alt={product?.name}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="category__content">
                  <h3>{product?.name}</h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsRow;
