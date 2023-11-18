"use client";

import "./order.scss";
import { useEffect } from "react";
import Image from "next/image";
import useOrders from "@/store/user/orders";

const Orders = () => {
  const { getOrders, orders, total } = useOrders();
  console.log(orders);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <h2 style={{ marginTop: "120px" }}>Sizning Buyurtmangiz Tasdiqlandi!</h2>

      <div className="order__wrapper">
        {/* {orders.map((el) => {
          return (
            <div className="order__cart" key={el?._id}>
              <Image src="" alt="jskd" width={100} height={100} />
              <h3>fjs</h3>
              <p>soni: 12</p>
              <h4>narxi</h4>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default Orders;
