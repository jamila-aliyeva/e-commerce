import request from "@/server";
import OrderType from "@/types/orders";

import { toast } from "react-toastify";
import { create } from "zustand";

interface OrdersState {
  orders: OrderType[];
  total: number;
  getOrders: () => void;
}

const useOrders = create<OrdersState>()((set, get) => ({
  orders: [],
  total: 0,
  getOrders: async () => {
    try {
      const { data } = await request.get("auth/payment");
      console.log(data);
      
      data.reverse();
      const orders = data.slice(0, 3);
      set({ orders, total: data.length });
    } catch (err: object | any) {
      toast.error("Xatolik!");
    }
  },
}));

export default useOrders;
