import request from "@/server";
import LastProductsType from "@/types/last-products";

import { create } from "zustand";

interface LatestType {
  loading: boolean;
  data: LastProductsType[];
  getData: () => void;
}

const useLatestProducts = create<LatestType>()((set) => ({
  loading: false,
  data: [],
  getData: async () => {
    const { data }: { data: LastProductsType[] } = await request.get(
      "last-products"
    );
    set({ data: data });
  },
}));

export default useLatestProducts;
