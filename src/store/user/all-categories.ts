import request from "@/server";
import AllCategoryType from "@/types/all-categories";

import { create } from "zustand";

interface CategoriesType {
  loading: boolean;
  data: AllCategoryType[];
  getData: () => void;
}

const useAllCategories = create<CategoriesType>()((set) => ({
  loading: false,
  data: [],
  getData: async () => {
    const { data }: { data: AllCategoryType[] } = await request.get("category");
    set({ data: data });
  },
}));

export default useAllCategories;
