import { create } from "zustand";
import { toast } from "react-toastify";
import AllCategoryType from "@/types/all-categories";
import request from "@/server";

interface CategoriesState {
  total: number;
  loading: boolean;
  data: AllCategoryType[];
  getData: () => void;
  addCategory: (
    category: { name: string; image: object },
    selected: string | null
  ) => void;
  deleteCategory: (id: string) => void;
}

const useCategory = create<CategoriesState>()((set, get) => ({
  loading: false,
  total: 0,
  data: [],
  getData: async () => {
    try {
      set({ loading: true });
      const { data }: { data: AllCategoryType[] } = await request.get(
        "category"
      );
      set({ data: data });
    } finally {
      set({ loading: false });
    }
  },

  addCategory: async (category, selected) => {
    try {
      set({ loading: true });
      if (selected === null) {
        await request.post("category", category);
      } else {
        await request.put(`category/${selected}`, category);
      }
      toast.success("Muaffaqiyatli o'zgartirildi!");
      get().getData();
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ loading: true });
      await request.delete(`category/${id}`);
      await get().getData();
      toast.info("Kategoriya o`chirildi");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategory;
