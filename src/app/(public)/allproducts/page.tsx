import AllproductsList from "@/app/list/all-products";
import "./style.scss";

const ProductsPage = () => {
  return (
    <section>
      <div className="container">
        <div className="products_title">
          <h1>Bizning Mahsulotlarimiz</h1>
          <AllproductsList />
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
