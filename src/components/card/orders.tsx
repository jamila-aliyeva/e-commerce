"use client";

import "./order.scss";
import { useEffect } from "react";
import Image from "next/image";
import useOrders from "@/store/user/orders";
import OrderType from "@/types/orders";

const Orders = () => {
  const { getOrders, orders, total } = useOrders();
  // console.log(orders);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <h2 style={{ marginTop: "120px" }}>Sizning Buyurtmangiz Tasdiqlandi!</h2>
      <h3>Buyurtmalar soni : {total}</h3>
      {orders.map((order: OrderType) => (
        <div className="order__wrapper" key={order?._id}>
          {/* Use order variable instead of mapping through orders again */}
          <div className="order__cart" key={order?._id}>
            {/* <Image src="" alt="hkhju" width={100} height={100} /> */}
            <h3>{order?.product?.title}</h3>
            <p>soni: {order?.product.description}</p>
            <h4>narxi: {order.quantity * order.product.price}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
