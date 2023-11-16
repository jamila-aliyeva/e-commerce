import AllproductsList from "@/app/list/all-products";
import "./style.scss";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Vodiy Parfum | Mahsulotlar",
  description: "Lorem ipusum ....",
};

const ProductsPage = () => {
  return (
    <section>
      <div className="container">
        <div className="products_title">
          
          <AllproductsList />
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
