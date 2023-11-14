import CartList from "@/app/list/cart";
import "./style.scss";

const CartPage = () => {
  return (
    <section>
      <div className="container">
        <h2 className="cart__title">Mahsulotlarim</h2>
        <CartList />
      </div>
    </section>
  );
};

export default CartPage;
