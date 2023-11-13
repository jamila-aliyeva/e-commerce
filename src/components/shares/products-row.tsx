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
            <CategoriesCard key={product._id} {...product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsRow;
